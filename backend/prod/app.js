"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
const configSchema = zod_1.z.object({
    MONGO_URL: zod_1.z.string(),
    API_KEY: zod_1.z.string(),
    API_SECRET: zod_1.z.string(),
    CLOUD_NAME: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    JWT_TIMES: zod_1.z.string(),
});
//database connect
const connectDB_1 = require("./db/connectDB");
const authRoute_1 = require("./route/authRoute");
const postRoute_1 = require("./route/postRoute");
cloudinary_1.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/v17/no-life/auth", authRoute_1.authRouter);
app.use("/api/v17/no-life/post", postRoute_1.postRouter);
const mongo_url = configSchema.parse(process.env);
console.log(mongo_url);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URL);
        app.listen(port, () => console.log("Sever running"));
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
