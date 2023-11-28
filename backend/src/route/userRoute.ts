import express from 'express'
import { followUser } from '../controller/userController'
import { authMiddleware } from '../middleware/auth'
const router = express.Router()

router.post("/follow/:id", authMiddleware, followUser)

export const userRoute = router