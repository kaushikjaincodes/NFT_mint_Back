import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

const mintRouter = Router();
dotenv.config();

mintRouter.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});
mintRouter.post("/NFT", async (req, res) => {
  try {
    const env = process.env.ENV;
    const { recipientEmail, imageUrl } = req.body;
    const chain = process.env.CHAIN;
    const recipientAddress = `email:${recipientEmail}:${chain}`;
    const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;
    const data = {
      method: "POST",
      url: url,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": process.env.API_KEY_MINT,
      },
      data: {
        recipient: recipientAddress,
        metadata: {
          name: "By ACM-PDEU student Chapter",
          image: imageUrl,
          description: "A souvenir from the ACM-PDEU family.",
        },
      },
    };

    const response = await axios(data);
    const actionId = response.data.actionId;
    console.log(`Action ID: ${actionId}`);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(8000);

    async function checkStatus(actionId) {
      const url1 = `https://${env}.crossmint.com/api/2022-06-09/actions/${actionId}`;
      const options1 = {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY_MINT,
        },
      };

      const actionResponse = await axios(url1, options1);
      const actionData = actionResponse.data;

      console.log(`Current Status: ${actionData.status}`);

      if (actionData.status === "succeeded") {
        console.log("NFT minting succeeded:", actionData);
        return actionData;
      } else if (actionData.status === "pending") {
        console.log("Status is still pending... Retrying in 8 seconds...");
        await delay(8000);
        return checkStatus(actionId);
      } else {
        throw new Error("Minting failed or unknown status");
      }
    }

    const finalResult = await checkStatus(actionId);
    console.log("Final Result:", finalResult);

    res.status(200).json({
      success: true,
      message: "NFT successfully minted",
      data: finalResult,
    });
  } catch (error) {
    console.error("Error minting NFT:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mint NFT",
      error: error.message,
    });
  }
});

export { mintRouter };