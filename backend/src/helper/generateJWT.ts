import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface Tosign {
    id: string | Types.ObjectId,
    email: string,
    username: string
}

const generateJWT = (data: Tosign) => {
    const token = jwt.sign({ userId: data.id, email: data.email, username: data.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES })
    return token;
}

export { generateJWT }