import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { hashPassword } from "../helper/hashPassword";
import { comparePass } from "../helper/comparePass";
import { generateJWT } from "../helper/generateJWT";
import { v2 as cloudinary } from 'cloudinary'
import { NotifModel } from "../model/notifModel";

const registUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(400).json({ msg: 'Please fill all requipment' })
    }

    if (!password) {
        return res.status(400).json({ msg: "Please fill password" })
    }


    try {
        const hashedPass = await hashPassword(password as string)
        console.log(hashedPass)

        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPass
        })
        const user = await userModel.create(newUser);

        return res.status(200).json({ msg: "Success", user })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ msg: "Please fill email" })
    }

    try {
        const user = await userModel.findOne({ email: email }).populate({ path: "notification.notifId", select: ["notificationText", "createdAt"] })

        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" })
        }

        const isPassMatch = await comparePass({ plainPass: password, databasePass: user.password })
        console.log(isPassMatch)

        if (!isPassMatch) {
            return res.status(400).json({ msg: "Password wrong" })
        }

        const newNotification = new NotifModel({
            notificationFor: user._id,
            createdBy: user._id,
            notificationText: `New login detected from Unknown Location, not you ? kindly change your password`
        })

        const notif = await NotifModel.create(newNotification)

        user.notification.push({
            notifId: notif._id
        })

        const token = await generateJWT({ email: email, id: user._id })

        await user.save()

        return res.status(200).json({ msg: "Success", user, token })
    } catch (error) {
        console.log(error)
    }
}

export { registUser, loginUser }