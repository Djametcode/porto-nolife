import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import { postModel } from "../model/postModel";
import { userModel } from "../model/userModel";
import { Types } from "mongoose";

const createPost = async (req: Request, res: Response) => {
    const createdBy = req.user.userId
    const { postText } = req.body
    let file = req.file?.path

    try {
        const user = await userModel.findOne({ _id: createdBy })

        if (!user) {
            return res.status(404).json({ msg: "Token not valid" })
        }
        if (!file) {
            if (!postText) {
                return res.status(400).json({ msg: "Please fill text" })
            }
            try {
                const newPost = new postModel({
                    postText: postText,
                    createdBy: createdBy

                })
                const post = await postModel.create(newPost)
                user.post.push({ postId: post._id })
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
            await user.post.push({ postId: post._id })
            await user.save()

            return res.status(200).json({ msg: "success", post })
        }
    } catch (error) {
        console.log(error)
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


            // Save the changes to the post
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

        // Delete the post
        await post.deleteOne();

        // Remove the post from the user's posts array
        user.post = user.post.filter(postId => postId.toString() !== id);

        // Save the changes to the user
        await user.save();

        return res.status(200).json({ msg: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


export { createPost, updatePost, getAllPost, getPostById, deletePost }