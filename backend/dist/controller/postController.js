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
exports.getPostById = exports.getAllPost = exports.updatePost = exports.createPost = void 0;
const cloudinary_1 = require("cloudinary");
const postModel_1 = require("../model/postModel");
const userModel_1 = require("../model/userModel");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const createdBy = req.user.userId;
    const { postText } = req.body;
    let file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!file) {
        if (!postText) {
            return res.status(400).json({ msg: "Please fill text" });
        }
        try {
            const newPost = new postModel_1.postModel({
                postText: postText,
                createdBy: createdBy
            });
            const user = yield userModel_1.userModel.findOne({ _id: createdBy });
            if (!user) {
                return res.status(404).json({ msg: "Token not valid" });
            }
            const post = yield postModel_1.postModel.create(newPost);
            user === null || user === void 0 ? void 0 : user.post.push({ postId: post._id });
            yield (user === null || user === void 0 ? void 0 : user.save());
            return res.status(200).json({ msg: "success", post, user });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        if (!postText) {
            return res.status(400).json({ msg: "Please fill text" });
        }
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            folder: "Testing",
            resource_type: 'auto'
        });
        const newPost = new postModel_1.postModel({
            postText: postText,
            images: [{
                    imageUrl: result.secure_url
                }],
            createdBy: createdBy
        });
        const post = yield postModel_1.postModel.create(newPost);
        return res.status(200).json({ msg: "success", post });
    }
});
exports.createPost = createPost;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.postModel.find({});
        return res.status(200).json({ msg: "success", post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllPost = getAllPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield postModel_1.postModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: "Fail, post not found" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBy = req.user.userId;
    const { updateText } = req.body;
    const { id, imageId } = req.query;
    let file = req.file ? req.file.path : null; // Check if req.file is available
    try {
        const post = yield postModel_1.postModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (!file && !updateText) {
            return res.status(400).json({ msg: "Please provide either update text or a file" });
        }
        if (post.createdBy.toString() !== createdBy) {
            return res.status(401).json({ msg: "Only the owner can update this post" });
        }
        if (file) {
            // If a file is provided, upload it to cloudinary
            const result = yield cloudinary_1.v2.uploader.upload(file, {
                folder: "Testing",
                resource_type: 'auto'
            });
            // Remove the image with the given imageId
            post.images = post.images.filter(image => image.toString() !== imageId);
            // Add the new image URL to the post
            post.images.push({ imageUrl: result.secure_url });
            // Save the changes to the post
            yield post.save();
        }
        if (updateText) {
            // Update the post text if provided
            post.postText = updateText;
            yield post.save();
        }
        return res.status(200).json({ msg: "Success", post });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const post = yield postModel_1.postModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" });
        }
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token not valid" });
        }
        const checkUser = post.createdBy.toString() === userId;
        console.log(checkUser);
        if (!checkUser) {
            return res.status(401).json({ msg: "Only creator can delete this" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
