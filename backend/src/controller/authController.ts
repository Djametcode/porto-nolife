import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { hashPassword } from "../helper/hashPassword";

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

export { registUser }