"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
router.post('/create-post', auth_1.authMiddleware, multer_1.upload, postController_1.createPost);
router.put('/update-post', auth_1.authMiddleware, multer_1.upload, postController_1.updatePost);
router.get('/get-all-post', postController_1.getAllPost);
router.get('/get-post/:id', postController_1.getPostById);
router.delete('/delete-post/:id', postController_1.deletePost);
exports.postRouter = router;
