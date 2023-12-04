import express from 'express'
import { loginUser, registUser } from '../controller/authController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
import { deleteAccount, getCurrentUser, updateUser } from '../controller/userController'
const route = express.Router()

route.post('/regist-user', registUser)
route.post('/login-user', loginUser)
route.put("/update-avatar", authMiddleware, upload.single('avatar'), updateUser)
route.delete('/delete-account', authMiddleware, deleteAccount)
route.get('/current-user', authMiddleware, getCurrentUser)

export const authRouter = route