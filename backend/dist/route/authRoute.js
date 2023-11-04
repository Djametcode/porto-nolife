"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const userController_1 = require("../controller/userController");
const route = express_1.default.Router();
route.post('/regist-user', authController_1.registUser);
route.post('/login-user', authController_1.loginUser);
route.patch("/update-avatar", auth_1.authMiddleware, multer_1.upload, userController_1.updateAvatar);
route.delete('/delete-account', auth_1.authMiddleware, userController_1.deleteAccount);
exports.authRouter = route;
