import express from "express";
import { mintRouter } from "./routes/mint.js";
import { imageRouter } from "./routes/imageurl.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/mint", mintRouter);
app.use("/api/v1/image", imageRouter);

function main() {
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
