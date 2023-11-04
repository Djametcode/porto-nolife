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
exports.deletePost = exports.getPostById = exports.getAllPost = exports.updatePost = exports.createPost = void 0;
const cloudinary_1 = require("cloudinary");
const postModel_1 = require("../model/postModel");
const userModel_1 = require("../model/userModel");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const createdBy = req.user.userId;
    const { postText } = req.body;
    let file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: createdBy });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        if (!file) {
            if (!postText) {
                return res.status(400).json({ msg: "Please fill text" });
            }
            try {
                const newPost = new postModel_1.postModel({
                    postText: postText,
                    createdBy: createdBy
                });
                const post = yield postModel_1.postModel.create(newPost);
                user.post.push({ postId: post._id });
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
            user.post.push({ postId: post._id });
            return res.status(200).json({ msg: "success", post });
        }
    }
    catch (error) {
        console.log(error);
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
            const check = post.images.length !== 0;
            console.log(check);
            if (check) {
                // Remove the image with the given imageId
                post.updateOne({ $pop: { "images._id": imageId } });
                // Add the new image URL to the post
                post.images.push({ imageUrl: result.secure_url });
                yield post.save();
                return res.status(200).json({ msg: "Success", post });
            }
            post.images.push({ imageUrl: result.secure_url });
            yield post.save();
            // Save the changes to the post
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
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token not valid" });
        }
        const post = yield postModel_1.postModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" });
        }
        if (post.createdBy.toString() !== userId) {
            return res.status(401).json({ msg: "Only the creator can delete this post" });
        }
        // Delete the post
        yield post.deleteOne();
        // Remove the post from the user's posts array
        user.post = user.post.filter(postId => postId.toString() !== id);
        // Save the changes to the user
        yield user.save();
        return res.status(200).json({ msg: "Success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.deletePost = deletePost;
