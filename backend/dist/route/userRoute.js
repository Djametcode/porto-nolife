"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
router.post("/follow/:id", auth_1.authMiddleware, userController_1.followUser);
router.patch('/update-avatar', auth_1.authMiddleware, multer_1.upload.single('avatar'), userController_1.updateUser);
router.get('/get-user/:id', auth_1.authMiddleware, userController_1.getUserById);
router.get('/get-my-notif', auth_1.authMiddleware, userController_1.getMyNotifcation);
exports.userRoute = router;
