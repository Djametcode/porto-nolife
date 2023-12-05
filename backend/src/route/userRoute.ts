import express from 'express'
import { followUser, getMyNotifcation, getUserById, updateUser } from '../controller/userController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const router = express.Router()

router.post("/follow/:id", authMiddleware, followUser)
router.patch('/update-avatar', authMiddleware, upload.single('avatar'), updateUser)
router.get('/get-user/:id', authMiddleware, getUserById)
router.get('/get-my-notif', authMiddleware, getMyNotifcation)

export const userRoute = router