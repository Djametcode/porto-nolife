var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../model/userModel";
import { v2 as cloudinary } from "cloudinary";
import { postModel } from "../model/postModel";
import { likeModel } from "../model/likeModel";
import { commentModel } from "../model/commentModel";
import { replyModel } from "../model/replyModel";
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const tokenCheck = yield userModel.findOne({ _id: userId });
        if (!tokenCheck) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const checkPrevillge = tokenCheck._id.toString() === userId;
        console.log(userId, tokenCheck._id);
        console.log(checkPrevillge);
        if (!checkPrevillge) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const post = yield postModel.deleteMany({ createdBy: userId });
        const like = yield likeModel.deleteMany({ createdBy: userId });
        const comment = yield commentModel.deleteMany({ createdBy: userId });
        const reply = yield replyModel.deleteMany({ createdBy: userId });
        const user = yield userModel.findOneAndDelete({ _id: userId });
        return res.status(200).json({ msg: "Account deleted thx for using no-life", user, post, like, comment, reply });
    }
    catch (error) {
        console.log(error);
    }
});
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file = req.file;
    let userId = req.user.userId;
    if (!file) {
        return res.status(400).json({ msg: "No file attaced" });
    }
    try {
        const user = yield userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        let result = yield cloudinary.uploader.upload(file.path, {
            folder: "Testing",
            resource_type: 'auto'
        });
        const updatedUser = yield userModel.findOneAndUpdate({ _id: userId }, { avatar: result.secure_url }, { new: true });
        return res.status(200).json({ msg: "success", updatedUser });
    }
    catch (error) {
        console.log(error);
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
    }
});
export { deleteAccount, updateAvatar, getCurrentUser };
