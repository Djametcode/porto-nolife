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
exports.searchSomething = exports.getMyPost = exports.getCommentByPostId = exports.deleteComment = exports.deleteReply = exports.replyComment = exports.unLikeComment = exports.likeComment = exports.commentPost = exports.unLikePost = exports.likePost = exports.deletePost = exports.getPostById = exports.getAllPost = exports.updatePost = exports.createPost = void 0;
const cloudinary_1 = require("cloudinary");
const postModel_1 = require("../model/postModel");
const userModel_1 = require("../model/userModel");
const likeModel_1 = require("../model/likeModel");
const commentModel_1 = require("../model/commentModel");
const replyModel_1 = require("../model/replyModel");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const createdBy = req.user.userId;
    const { postText } = req.body;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: createdBy });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        if (!file && !postText) {
            return res.status(400).json({ msg: "Please provide either text or file" });
        }
        if (file) {
            const result = yield cloudinary_1.v2.uploader.upload(file, {
                folder: "Testing",
                resource_type: 'auto'
            });
            const newPost = new postModel_1.postModel({
                postText: postText || '',
                images: [{
                        imageUrl: result.secure_url
                    }],
                createdBy: createdBy
            });
            const post = yield postModel_1.postModel.create(newPost);
            user === null || user === void 0 ? void 0 : user.post.push({ postId: post._id });
            yield (user === null || user === void 0 ? void 0 : user.save());
            return res.status(200).json({ msg: "success", post });
        }
        // If no file, create post without image
        const newPost = new postModel_1.postModel({
            postText: postText || '',
            createdBy: createdBy
        });
        const post = yield postModel_1.postModel.create(newPost);
        user === null || user === void 0 ? void 0 : user.post.push({ postId: post._id });
        yield (user === null || user === void 0 ? void 0 : user.save());
        return res.status(200).json({ msg: "success", post });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createPost = createPost;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.postModel.find({}).populate({ path: "createdBy", select: ["username", "avatar", "follower"] }).populate({ path: "like.likeId", populate: { path: "createdBy", select: ["_id", "username"] } });
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
        const post = yield postModel_1.postModel.findOne({ _id: id }).populate({ path: "createdBy", select: ["username", "avatar"] }).populate({ path: "like.likeId", populate: { path: "createdBy", select: ["_id", "username"] } });
        if (!post) {
            return res.status(404).json({ msg: "Fail, post not found" });
        }
        return res.status(200).json({ msg: 'success', post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostById = getPostById;
const getMyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const post = yield postModel_1.postModel.find({ createdBy: userId });
        return res.status(200).json({ msg: "Success", post });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.getMyPost = getMyPost;
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
        const deletedPost = yield postModel_1.postModel.findOneAndDelete({ _id: id });
        const postIndex = user.post.findIndex((item) => item.postId.equals(id));
        console.log(postIndex);
        user.post.splice(postIndex, 1);
        yield user.save();
        return res.status(200).json({ msg: "Success", user, deletedPost });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: 'Token invalid' });
        }
        const post = yield postModel_1.postModel.findOne({ _id: id });
        const check = yield likeModel_1.likeModel.findOne({ postId: id, createdBy: userId });
        console.log(check);
        if (check) {
            return res.status(400).json({ msg: "You only can like once :3" });
        }
        const newLike = new likeModel_1.likeModel({
            postId: id,
            createdBy: userId
        });
        const like = yield likeModel_1.likeModel.create(newLike);
        post === null || post === void 0 ? void 0 : post.like.push({ likeId: like._id });
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({ msg: "Success like post", post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.likePost = likePost;
const unLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { likeId, postId } = req.query;
    try {
        const like = yield likeModel_1.likeModel.findOneAndDelete({ _id: likeId });
        const post = yield postModel_1.postModel.findOne({ _id: postId });
        const likeIndex = post === null || post === void 0 ? void 0 : post.like.findIndex((item) => item.likeId.equals(like === null || like === void 0 ? void 0 : like._id));
        console.log(likeIndex);
        if (likeIndex != -1 && likeIndex != undefined) {
            post === null || post === void 0 ? void 0 : post.like.splice(likeIndex, 1);
            yield (post === null || post === void 0 ? void 0 : post.save());
            return res.status(200).json({ msg: "success unlike", post });
        }
        return res.status(404).json({ msg: "Like already deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.unLikePost = unLikePost;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params;
    const userId = req.user.userId;
    const { commentText } = req.body;
    if (!commentText) {
        return res.status(400).json({ msg: "Please provide comment text" });
    }
    try {
        const post = yield postModel_1.postModel.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" });
        }
        const newComment = new commentModel_1.commentModel({
            commentText: commentText,
            createdBy: userId,
            postId: postId
        });
        const comment = yield commentModel_1.commentModel.create(newComment);
        post.comment.push({ commentId: comment._id });
        yield post.save();
        return res.status(200).json({ msg: "success", comment });
    }
    catch (error) {
        console.log(error);
    }
});
exports.commentPost = commentPost;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.query;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const post = yield postModel_1.postModel.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ msg: "Post not found or already deleted" });
        }
        const comment = yield commentModel_1.commentModel.findOneAndDelete({ _id: commentId });
        const checkOwner = (comment === null || comment === void 0 ? void 0 : comment.createdBy.toString()) === userId;
        if (!checkOwner) {
            return res.status(401).json({ msg: "Only comment owner can delete this" });
        }
        const commentIndex = post.comment.findIndex((item) => item.commentId.equals(comment === null || comment === void 0 ? void 0 : comment._id));
        if (commentIndex !== -1 && commentIndex !== undefined) {
            post.comment.splice(commentIndex, 1);
            yield post.save();
            return res.status(200).json({ msg: "success delete comment", post });
        }
        return res.status(400).json({ msg: "comment not found or already deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteComment = deleteComment;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const comment = yield commentModel_1.commentModel.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({ msg: "comment not found" });
        }
        const check = comment === null || comment === void 0 ? void 0 : comment.commentLike.findIndex((item) => item.createdBy.equals(userId));
        console.log(check);
        if (check !== -1) {
            return res.status(400).json({ msg: "You only can like comment once :3" });
        }
        comment === null || comment === void 0 ? void 0 : comment.commentLike.push({ createdBy: user._id });
        yield comment.save();
        return res.status(200).json({ msg: "Success like comment", comment });
    }
    catch (error) {
        console.log(error);
    }
});
exports.likeComment = likeComment;
const unLikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const comment = yield commentModel_1.commentModel.findOne({ _id: commentId });
        console.log(comment);
        const likeIndex = comment === null || comment === void 0 ? void 0 : comment.commentLike.findIndex((item) => item.createdBy.equals(userId));
        console.log(likeIndex);
        if (likeIndex !== -1 && likeIndex !== undefined) {
            comment === null || comment === void 0 ? void 0 : comment.commentLike.splice(likeIndex, 1);
            yield (comment === null || comment === void 0 ? void 0 : comment.save());
            return res.status(200).json({ msg: "Success unlike", comment });
        }
        return res.status(400).json({ msg: "Like already deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.unLikeComment = unLikeComment;
const replyComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const userId = req.user.userId;
    const { replyText } = req.body;
    if (!replyText) {
        return res.status(400).json({ msg: "Please provide reply text" });
    }
    try {
        const comment = yield commentModel_1.commentModel.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({ msg: "comment not found or already deleted" });
        }
        const newReply = new replyModel_1.replyModel({
            replyText: replyText,
            commentId: commentId,
            createdBy: userId
        });
        const reply = yield replyModel_1.replyModel.create(newReply);
        comment.commentReply.push({ replyId: reply._id });
        yield comment.save();
        return res.status(200).json({ msg: "success", comment });
    }
    catch (error) {
    }
});
exports.replyComment = replyComment;
const deleteReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, replyId } = req.query;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const comment = yield commentModel_1.commentModel.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({ msg: "comment not found or deleted" });
        }
        const ownerReply = yield replyModel_1.replyModel.findOne({ _id: replyId });
        const ownerCheck = (ownerReply === null || ownerReply === void 0 ? void 0 : ownerReply.createdBy.toString()) === userId;
        console.log(ownerCheck);
        if (!ownerCheck) {
            return res.status(401).json({ msg: "Only reply owner can delete this" });
        }
        const reply = yield replyModel_1.replyModel.findOneAndDelete({ commentId: commentId, createdBy: userId });
        if (!reply) {
            return res.status(400).json({ msg: "reply already deleted", comment });
        }
        const replyIndex = comment.commentReply.findIndex((item) => item.replyId.equals(reply._id));
        if (replyIndex !== -1 && replyIndex !== undefined) {
            comment.commentReply.splice(replyIndex, 1);
            yield comment.save();
            return res.status(200).json({ msg: "success delete reply", comment });
        }
        return res.status(401).json({ msg: "reply already deleted or not found" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteReply = deleteReply;
const getCommentByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params;
    try {
        const comment = yield commentModel_1.commentModel.find({ postId: postId }).populate({ path: "createdBy", select: ["username", "avatar"] });
        return res.status(200).json({ msg: "Success", comment });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCommentByPostId = getCommentByPostId;
const searchSomething = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.query;
    const userId = req.user.userId;
    if (!key) {
        return res.status(400).json({ msg: "Please provide query key" });
    }
    try {
        const check = yield userModel_1.userModel.findOne({ _id: userId });
        if (!check) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const regexPattern = new RegExp(key, 'i');
        const users = yield userModel_1.userModel.find({
            $or: [
                { username: { $regex: regexPattern } },
                { email: { $regex: regexPattern } },
                // Add other fields you want to search here
            ],
        }).select("username avatar follower");
        const post = yield postModel_1.postModel.find({
            postText: { $regex: regexPattern }
        }).select("postText createdBy").populate({ path: "createdBy", select: ["username", "avatar"] });
        return res.status(200).json({ msg: "success", user: users, post: post });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.searchSomething = searchSomething;
