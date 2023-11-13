import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import { z } from "zod";
const app = express();
const port = 3000 || process.env.PORT;

const configSchema = z.object({
  MONGO_URL: z.string(),
  API_KEY: z.string(),
  API_SECRET: z.string(),
  CLOUD_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_TIMES: z.string(),
});

//database connect
import { connectDB } from "./db/connectDB";
import { authRouter } from "./route/authRoute";
import { postRouter } from "./route/postRoute";

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v17/no-life/auth", authRouter);
app.use("/api/v17/no-life/post", postRouter);

const mongo_url = configSchema.parse(process.env);

const startServer = async () => {
  try {
    if (!mongo_url) {
      console.log("Validate error");
    }
    await connectDB(mongo_url.MONGO_URL);
    app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log(error);
  }
};

startServer();
