import express from 'express'
import { loginUser, registUser, updateAvatar } from '../controller/authController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const route = express.Router()

route.post('/regist-user', registUser)
route.post('/login-user', loginUser)
route.patch("/update-avatar", authMiddleware, upload, updateAvatar)

export const authRouter = route