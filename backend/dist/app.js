var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import express from 'express';
const app = express();
const port = 3000 || process.env.PORT;
//database connect
import { connectDB } from './db/connectDB';
import { authRouter } from './route/authRoute';
import { postRouter } from './route/postRoute';
cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v17/no-life/auth', authRouter);
app.use('/api/v17/no-life/post', postRouter);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log("Sever running"));
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
