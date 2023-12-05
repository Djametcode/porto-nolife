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
exports.getMyNotifcation = exports.getUserById = exports.followUser = exports.getCurrentUser = exports.updateUser = exports.deleteAccount = void 0;
const userModel_1 = require("../model/userModel");
const cloudinary_1 = require("cloudinary");
const postModel_1 = require("../model/postModel");
const likeModel_1 = require("../model/likeModel");
const commentModel_1 = require("../model/commentModel");
const replyModel_1 = require("../model/replyModel");
const notifModel_1 = require("../model/notifModel");
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
        return res.status(200).json({
            msg: "Account deleted thx for using no-life",
            user,
            post,
            like,
            comment,
            reply,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAccount = deleteAccount;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req;
    let userId = req.user.userId;
    if (!file) {
        return res.status(400).json({ msg: "No file attaced" });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        const result = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: 'Testing',
            resource_type: 'auto'
        });
        const updatedUser = yield userModel_1.userModel.findOneAndUpdate({ _id: userId }, { avatar: result.secure_url }, { new: true });
        return res.status(200).json({ msg: "success", updatedUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.userModel.findOne({ _id: req.user.userId }).populate({ path: "follower.userId" }).populate({ path: "notification.notifId" });
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
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const check = userId === id;
        if (check) {
            return res.status(400).json({ msg: "cannot follow yourself" });
        }
        const targetUser = yield userModel_1.userModel.findOne({ _id: id });
        if (!targetUser) {
            return res.status(404).json({ msg: "User not found or deleted" });
        }
        const isFollowed = targetUser.follower.findIndex((item) => item.userId.equals(userId));
        if (isFollowed !== -1) {
            return res.status(400).json({ msg: "already followed" });
        }
        const newNotification = new notifModel_1.NotifModel({
            notificationFor: id,
            notificationText: `${user.username} starts following you`,
            createdBy: userId,
        });
        const notif = yield notifModel_1.NotifModel.create(newNotification);
        user.following.push({
            userId: targetUser._id,
        });
        targetUser.notification.push({
            notifId: notif._id
        });
        targetUser.follower.push({
            userId: user._id,
        });
        yield user.save();
        yield targetUser.save();
        return res.status(200).json({
            msg: "Success following",
            status: res.status,
            data: {
                user: user,
                target: targetUser,
            },
        });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.followUser = followUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId }).populate({ path: "post.postId", select: ["postText", "images"] }).select(["username", "avatar", "follower", "following", "post"]);
        if (!user) {
            return res.status(401).json({ msg: 'Token invalid' });
        }
        return res.status(200).json({ msg: "success", user });
    }
    catch (error) {
    }
});
exports.getUserById = getUserById;
const getMyNotifcation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const notif = yield notifModel_1.NotifModel.find({ notificationFor: userId }).populate({ path: "createdBy", select: ["username", "avatar"] });
        return res.status(200).json({ msg: "success", notif });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.getMyNotifcation = getMyNotifcation;
