import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken'

interface IPayload {
    userId: string;
    email: string
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: 'please login first' })
    }

    const token = authHeader.split(" ")[1]
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET as Secret) as IPayload
        req.user = { userId: payload.userId, email: payload.email }
        next()
    } catch (error) {

    }
}

export { authMiddleware }