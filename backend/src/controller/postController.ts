import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import { postModel } from "../model/postModel";
import { userModel } from "../model/userModel";

const createPost = async (req: Request, res: Response) => {
    const createdBy = req.user.userId
    const { postText } = req.body
    let file = req.file?.path

    if (!file) {
        if (!postText) {
            return res.status(400).json({ msg: "Please fill text" })
        }
        try {
            const newPost = new postModel({
                postText: postText,
                createdBy: createdBy

            })

            const user = await userModel.findOne({ _id: createdBy })

            if (!user) {
                return res.status(404).json({ msg: "Token not valid" })
            }
            const post = await postModel.create(newPost)
            user?.post.push({ postId: post._id })
            await user?.save()

            return res.status(200).json({ msg: "success", post, user })
        } catch (error) {
            console.log(error)
        }
    } else {
        if (!postText) {
            return res.status(400).json({ msg: "Please fill text" })
        }
        const result = await cloudinary.uploader.upload(file, {
            folder: "Testing",
            resource_type: 'auto'
        })

        const newPost = new postModel({
            postText: postText,
            images: [{
                imageUrl: result.secure_url
            }],
            createdBy: createdBy
        })

        const post = await postModel.create(newPost)

        return res.status(200).json({ msg: "success", post })
    }
}

const getAllPost = async (req: Request, res: Response) => {
    try {
        const post = await postModel.find({})

        return res.status(200).json({ msg: "success", post })
    } catch (error) {
        console.log(error)
    }
}

const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await postModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: "Fail, post not found" })
        }
    } catch (error) {
        console.log(error)
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

            // Remove the image with the given imageId
            post.images = post.images.filter(image => image._id.toString() !== imageId);

            // Add the new image URL to the post
            post.images.push({ imageUrl: result.secure_url });

            // Save the changes to the post
            await post.save();
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
    const { id } = req.params
    const userId = req.user.userId

    try {
        const post = await postModel.findOne({ _id: id })

        if (!post) {
            return res.status(404).json({ msg: "Post not found or deleted" })
        }

        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token not valid" })
        }

        const checkUser = post.createdBy.toString() === userId;
        console.log(checkUser)

        if (!checkUser) {
            return res.status(401).json({ msg: "Only creator can delete this" })
        }

    } catch (error) {
        console.log(error)
    }
}

export { createPost, updatePost, getAllPost, getPostById }