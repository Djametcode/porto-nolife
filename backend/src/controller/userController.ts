import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { v2 as cloudinary } from "cloudinary";

const deleteAccount = async (req: Request, res: Response) => {
    const userId = req.user.userId;

    try {
        const user = await userModel.findOneAndDelete({ _id: userId })

        return res.status(200).json({ msg: "Account deleted thx for using no-life", user })
    } catch (error) {
        console.log(error)
    }
}


const updateAvatar = async (req: Request, res: Response) => {
    let file = req.file
    let userId = req.user.userId

    if (!file) {
        return res.status(400).json({ msg: "No file attaced" })
    }

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(404).json({ msg: "Token not valid" })
        }

        let result = await cloudinary.uploader.upload(file.path, {
            folder: "Testing",
            resource_type: 'auto'
        })

        user.updateOne({ $set: { avatar: result.secure_url } })
        await user.save()

        return res.status(200).json({ msg: "success", user })
    } catch (error) {
        console.log(error)
    }
}

export { deleteAccount, updateAvatar }