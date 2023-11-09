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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.updateAvatar = exports.deleteAccount = void 0;
const userModel_1 = require("../model/userModel");
const cloudinary_1 = require("cloudinary");
const postModel_1 = require("../model/postModel");
const likeModel_1 = require("../model/likeModel");
const commentModel_1 = require("../model/commentModel");
const replyModel_1 = require("../model/replyModel");
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const tokenCheck = yield userModel_1.userModel.findOne({ _id: userId });
        if (!tokenCheck) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const checkPrevillge = tokenCheck._id.toString() === userId;
        console.log(userId, tokenCheck._id);
        console.log(checkPrevillge);
        if (!checkPrevillge) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const post = yield postModel_1.postModel.deleteMany({ createdBy: userId });
        const like = yield likeModel_1.likeModel.deleteMany({ createdBy: userId });
        const comment = yield commentModel_1.commentModel.deleteMany({ createdBy: userId });
        const reply = yield replyModel_1.replyModel.deleteMany({ createdBy: userId });
        const user = yield userModel_1.userModel.findOneAndDelete({ _id: userId });
        return res.status(200).json({ msg: "Account deleted thx for using no-life", user, post, like, comment, reply });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAccount = deleteAccount;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file = req.file;
    let userId = req.user.userId;
    if (!file) {
        return res.status(400).json({ msg: "No file attaced" });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        let result = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: "Testing",
            resource_type: 'auto'
        });
        const updatedUser = yield userModel_1.userModel.findOneAndUpdate({ _id: userId }, { avatar: result.secure_url }, { new: true });
        return res.status(200).json({ msg: "success", updatedUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAvatar = updateAvatar;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.userModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCurrentUser = getCurrentUser;
