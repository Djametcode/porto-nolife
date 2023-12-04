import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { v2 as cloudinary } from "cloudinary";
import { postModel } from "../model/postModel";
import { likeModel } from "../model/likeModel";
import { commentModel } from "../model/commentModel";
import { replyModel } from "../model/replyModel";
import { followerModel } from "../model/followerModel";

const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const tokenCheck = await userModel.findOne({ _id: userId });

    if (!tokenCheck) {
      return res.status(401).json({ msg: "Token invalid" });
    }

    const checkPrevillge = tokenCheck._id.toString() === userId;
    console.log(userId, tokenCheck._id);
    console.log(checkPrevillge);

    if (!checkPrevillge) {
      return res.status(401).json({ msg: "Please login with correct account" });
    }

    const post = await postModel.deleteMany({ createdBy: userId });
    const like = await likeModel.deleteMany({ createdBy: userId });
    const comment = await commentModel.deleteMany({ createdBy: userId });
    const reply = await replyModel.deleteMany({ createdBy: userId });

    const user = await userModel.findOneAndDelete({ _id: userId });

    return res.status(200).json({
      msg: "Account deleted thx for using no-life",
      user,
      post,
      like,
      comment,
      reply,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {

  const { file } = req

  let userId = req.user.userId

  if (!file) {
    return res.status(400).json({ msg: "No file attaced" });
  }

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "Token not valid" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'Testing',
      resource_type: 'auto'
    })

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { avatar: result.secure_url },
      { new: true }
    );

    return res.status(200).json({ msg: "success", updatedUser });
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(401).json({ msg: "Token invalid" });
    }

    return res.status(200).json({ msg: "Success", user });
  } catch (error) {
    console.log(error);
  }
};

const followUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ msg: "Token invalid" });
    }

    const check = userId === id

    if (check) {
      return res.status(400).json({ msg: "cannot follow yourself" })
    }

    const targetUser = await userModel.findOne({ _id: id });

    if (!targetUser) {
      return res.status(404).json({ msg: "User not found or deleted" });
    }

    const isFollowed = targetUser.follower.findIndex((item) => item.userId.equals(userId))

    if (isFollowed !== -1) {
      return res.status(400).json({ msg: "already followed" })
    }

    user.following.push({
      userId: targetUser._id,
    });

    targetUser.follower.push({
      userId: user._id,
    });

    await user.save();
    await targetUser.save();

    return res.status(200).json({
      msg: "Success following",
      status: res.status,
      data: {
        user: user,
        target: targetUser,
      },
    });
  } catch (error) {
    return res.status(501).json({ msg: "Internal Server Error" });
  }
};

export { deleteAccount, updateUser, getCurrentUser, followUser };
