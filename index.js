import express from "express";
import { mintRouter } from "./routes/mint.js";
import { imageRouter } from "./routes/imageurl.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());

app.get("/",(req,res)=>{
  res.send({
    message : "working",
  })
})
app.use("/api/v1/mint", mintRouter);
app.use("/api/v1/image", imageRouter);

function main() {
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
