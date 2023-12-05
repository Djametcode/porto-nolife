import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import { postModel } from "../model/postModel";
import { userModel } from "../model/userModel";
import { likeModel } from "../model/likeModel";
import { commentModel } from "../model/commentModel";
import { replyModel } from "../model/replyModel";
import { NotifModel } from "../model/notifModel";

const createPost = async (req: Request, res: Response) => {
    const createdBy = req.user.userId;
    const { postText } = req.body;
    const file = req.file?.path;

    try {
        const user = await userModel.findOne({ _id: createdBy });

        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }

        if (!file && !postText) {
            return res.status(400).json({ msg: "Please provide either text or file" });
        }

        if (file) {
            const result = await cloudinary.uploader.upload(file, {
                folder: "Testing",
                resource_type: 'auto'
            });

            const newPost = new postModel({
                postText: postText || '', // Handle the case where postText is undefined
                images: [{
                    imageUrl: result.secure_url
                }],
                createdBy: createdBy
            });

            const post = await postModel.create(newPost);
            user?.post.push({ postId: post._id });
            await user?.save();

            return res.status(200).json({ msg: "success", post });
        }

        // If no file, create post without image
        const newPost = new postModel({
            postText: postText || '',
            createdBy: createdBy
        });

        const post = await postModel.create(newPost);
        user?.post.push({ postId: post._id });
        await user?.save();

        return res.status(200).json({ msg: "success", post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const getAllPost = async (req: Request, res: Response) => {
    try {
        const post = await postModel.find({}).populate({ path: "createdBy", select: ["username", "avatar", "follower"] }).populate({ path: "like.likeId", populate: { path: "createdBy", select: ["_id", "username"] } })

        return res.status(200).json({ msg: "success", post })
    } catch (error) {
        console.log(error)
    }
}

const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await postModel.findOne({ _id: id }).populate({ path: "createdBy", select: ["username", "avatar"] }).populate({ path: "like.likeId", populate: { path: "createdBy", select: ["_id", "username"] } });

        if (!post) {
            return res.status(404).json({ msg: "Fail, post not found" })
        }

        return res.status(200).json({ msg: 'success', post })
    } catch (error) {
        console.log(error)
    }
}

const getMyPost = async (req: Request, res: Response) => {
    const userId = req.user.userId

    try {
        const post = await postModel.find({ createdBy: userId })

        return res.status(200).json({ msg: "Success", post })
    } catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" })
    }
}

const updatePost = async (req: Request, res: Response) => {
    const createdBy = req.user.userId;
    const { updateText } = req.body;
    const { id, imageId } = req.query;
    let file = req.file ? req.file.path : null; // Check if req.file is available

    try {
        const post = await postModel.findOne({ _id: id });

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
            const result = await cloudinary.uploader.upload(file, {
                folder: "Testing",
                resource_type: 'auto'
            });

            const check = post.images.length !== 0
            console.log(check)

            if (check) {
                // Remove the image with the given imageId
                post.updateOne({ $pop: { "images._id": imageId } })
                // Add the new image URL to the post
                post.images.push({ imageUrl: result.secure_url });
                await post.save();

                return res.status(200).json({ msg: "Success", post })
            }

            post.images.push({ imageUrl: result.secure_url })
            await post.save()

        }

        if (updateText) {
            // Update the post text if provided
            post.postText = updateText;
            await post.save();
        }

        return res.status(200).json({ msg: "Success", post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({ msg: "Token not valid" });
        }

        const post = await postModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" });
        }

        if (post.createdBy.toString() !== userId) {
            return res.status(401).json({ msg: "Only the creator can delete this post" });
        }

        const deletedPost = await postModel.findOneAndDelete({ _id: id })
        const postIndex = user.post.findIndex((item) => item.postId.equals(id))
        console.log(postIndex)
        user.post.splice(postIndex, 1)
        await user.save();

        return res.status(200).json({ msg: "Success", user, deletedPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const likePost = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: 'Token invalid' })
        }

        const post = await postModel.findOne({ _id: id })

        const targetUser = await userModel.findOne({ _id: post?.createdBy._id })

        const check = await likeModel.findOne({ postId: id, createdBy: userId })
        console.log(check)

        if (check) {
            return res.status(400).json({ msg: "You only can like once :3" })
        }

        const newLike = new likeModel({
            postId: id,
            createdBy: userId
        })

        const like = await likeModel.create(newLike)
        post?.like.push({ likeId: like._id })
        await post?.save()

        const newNotification = new NotifModel({
            notificationFor: post?.createdBy._id,
            createdBy: user._id,
            notificationText: `${user.username} like your post`
        })

        const notif = await NotifModel.create(newNotification)

        targetUser?.notification.push({
            notifId: notif._id
        })

        await targetUser?.save()

        return res.status(200).json({ msg: "Success like post", post })
    } catch (error) {
        console.log(error)
    }
}

const unLikePost = async (req: Request, res: Response) => {
    const { likeId, postId } = req.query;

    try {
        const like = await likeModel.findOneAndDelete({ _id: likeId });
        const post = await postModel.findOne({ _id: postId })

        const likeIndex = post?.like.findIndex((item) => item.likeId.equals(like?._id))
        console.log(likeIndex)

        if (likeIndex != -1 && likeIndex != undefined) {
            post?.like.splice(likeIndex, 1);
            await post?.save()

            return res.status(200).json({ msg: "success unlike", post })
        }

        return res.status(404).json({ msg: "Like already deleted" })

    } catch (error) {
        console.log(error)
    }
}

const commentPost = async (req: Request, res: Response) => {
    const { id: postId } = req.params
    const userId = req.user.userId
    const { commentText } = req.body

    if (!commentText) {
        return res.status(400).json({ msg: "Please provide comment text" })
    }

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" })
        }

        const post = await postModel.findOne({ _id: postId })
        const targetUser = await userModel.findOne({ _id: post?.createdBy._id })

        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" })
        }

        const newComment = new commentModel({
            commentText: commentText,
            createdBy: userId,
            postId: postId
        })

        const comment = await commentModel.create(newComment)

        post.comment.push({ commentId: comment._id })
        await post.save()

        const newNotification = new NotifModel({
            notificationText: `${user.username} commented on your post`,
            notificationFor: targetUser?._id,
            createdBy: user._id
        })

        const notif = await NotifModel.create(newNotification)

        targetUser?.notification.push({
            notifId: notif._id
        })

        await targetUser?.save()

        return res.status(200).json({ msg: "success", comment })
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (req: Request, res: Response) => {
    const { postId, commentId } = req.query
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const post = await postModel.findOne({ _id: postId })

        if (!post) {
            return res.status(404).json({ msg: "Post not found or already deleted" })
        }

        const comment = await commentModel.findOneAndDelete({ _id: commentId })

        const checkOwner = comment?.createdBy.toString() === userId

        if (!checkOwner) {
            return res.status(401).json({ msg: "Only comment owner can delete this" })
        }

        const commentIndex = post.comment.findIndex((item) => item.commentId.equals(comment?._id))

        if (commentIndex !== -1 && commentIndex !== undefined) {
            post.comment.splice(commentIndex, 1)
            await post.save()

            return res.status(200).json({ msg: "success delete comment", post })
        }

        return res.status(400).json({ msg: "comment not found or already deleted" })
    } catch (error) {
        console.log(error)
    }
}

const likeComment = async (req: Request, res: Response) => {
    const { id: commentId } = req.params
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }
        const comment = await commentModel.findOne({ _id: commentId })

        if (!comment) {
            return res.status(404).json({ msg: "comment not found" })
        }

        const check = comment?.commentLike.findIndex((item) => item.createdBy.equals(userId))
        console.log(check)

        if (check !== -1) {
            return res.status(400).json({ msg: "You only can like comment once :3" })
        }

        comment?.commentLike.push({ createdBy: user._id })
        await comment.save()

        return res.status(200).json({ msg: "Success like comment", comment })

    } catch (error) {
        console.log(error)
    }
}

const unLikeComment = async (req: Request, res: Response) => {
    const { id: commentId } = req.params
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const comment = await commentModel.findOne({ _id: commentId })
        console.log(comment)

        const likeIndex = comment?.commentLike.findIndex((item) => item.createdBy.equals(userId))
        console.log(likeIndex)

        if (likeIndex !== -1 && likeIndex !== undefined) {
            comment?.commentLike.splice(likeIndex, 1)
            await comment?.save()

            return res.status(200).json({ msg: "Success unlike", comment })
        }

        return res.status(400).json({ msg: "Like already deleted" })
    } catch (error) {
        console.log(error)
    }
}

const replyComment = async (req: Request, res: Response) => {
    const { id: commentId } = req.params
    const userId = req.user.userId
    const { replyText } = req.body

    if (!replyText) {
        return res.status(400).json({ msg: "Please provide reply text" })
    }

    try {
        const comment = await commentModel.findOne({ _id: commentId })

        if (!comment) {
            return res.status(404).json({ msg: "comment not found or already deleted" })
        }

        const newReply = new replyModel({
            replyText: replyText,
            commentId: commentId,
            createdBy: userId
        })

        const reply = await replyModel.create(newReply)
        comment.commentReply.push({ replyId: reply._id })
        await comment.save()

        return res.status(200).json({ msg: "success", comment })

    } catch (error) {

    }
}

const deleteReply = async (req: Request, res: Response) => {
    const { commentId, replyId } = req.query
    const userId = req.user.userId
    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const comment = await commentModel.findOne({ _id: commentId })

        if (!comment) {
            return res.status(404).json({ msg: "comment not found or deleted" })
        }

        const ownerReply = await replyModel.findOne({ _id: replyId })

        const ownerCheck = ownerReply?.createdBy.toString() === userId;
        console.log(ownerCheck)

        if (!ownerCheck) {
            return res.status(401).json({ msg: "Only reply owner can delete this" })
        }

        const reply = await replyModel.findOneAndDelete({ commentId: commentId, createdBy: userId })

        if (!reply) {
            return res.status(400).json({ msg: "reply already deleted", comment })
        }

        const replyIndex = comment.commentReply.findIndex((item) => item.replyId.equals(reply._id))

        if (replyIndex !== -1 && replyIndex !== undefined) {
            comment.commentReply.splice(replyIndex, 1)
            await comment.save()

            return res.status(200).json({ msg: "success delete reply", comment })
        }

        return res.status(401).json({ msg: "reply already deleted or not found" })
    } catch (error) {
        console.log(error)
    }
}

const getCommentByPostId = async (req: Request, res: Response) => {
    const { id: postId } = req.params
    try {
        const comment = await commentModel.find({ postId: postId }).populate({ path: "createdBy", select: ["username", "avatar"] })

        return res.status(200).json({ msg: "Success", comment })
    } catch (error) {
        console.log(error)
    }
}

const searchSomething = async (req: Request, res: Response) => {
    const { key } = req.query
    const userId = req.user.userId;

    if (!key) {
        return res.status(400).json({ msg: "Please provide query key" })
    }

    try {
        const check = await userModel.findOne({ _id: userId })

        if (!check) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const regexPattern = new RegExp(key as string, 'i')

        const users = await userModel.find({
            $or: [
                { username: { $regex: regexPattern } },
                { email: { $regex: regexPattern } },
                // Add other fields you want to search here
            ],
        }).select("username avatar follower")

        const post = await postModel.find({
            postText: { $regex: regexPattern }
        }).select("postText createdBy").populate({ path: "createdBy", select: ["username", "avatar"] })

        return res.status(200).json({ msg: "success", user: users, post: post })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export {
    createPost,
    updatePost,
    getAllPost,
    getPostById,
    deletePost,
    likePost,
    unLikePost,
    commentPost,
    likeComment,
    unLikeComment,
    replyComment,
    deleteReply,
    deleteComment,
    getCommentByPostId,
    getMyPost,
    searchSomething
}