import { Request, Response } from "express";
import { userModel } from "../model/userModel";

const registUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(401).json({ msg: 'Please fill all requipment' })
    }

    try {

    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}