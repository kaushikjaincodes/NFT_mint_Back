import express from "express";
import { mintRouter } from "./routes/mint.js";
import { imageRouter } from "./routes/imageurl.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-production-frontend-url.com'], // Add your frontend URLs here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Version', 'X-CSRF-Token'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send({
    message: "working",
  });
});

app.use("/api/v1/mint", mintRouter);
app.use("/api/v1/image", imageRouter);

function main() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();