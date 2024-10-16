import { Router } from "express";
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from "body-parser";
import dotenv from "dotenv"
const imageRouter = Router();
dotenv.config();
imageRouter.use(bodyParser.json({ limit: '50mb' }));

imageRouter.post("/geturl",async (req,res)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_IMG,
        api_secret: process.env.API_SECRET,
    });

    const { base64Data } = req.body;

    if (!base64Data) {
        return res.status(400).send('No image provided.');
    }

    try {
        const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'nft-images', 
        });
        
        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send('Error uploading image');
    }
})

export { imageRouter };
