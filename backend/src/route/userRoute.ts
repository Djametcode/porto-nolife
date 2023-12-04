import express from 'express'
import { followUser, updateUser } from '../controller/userController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const router = express.Router()

router.post("/follow/:id", authMiddleware, followUser)
router.patch('/update-avatar', authMiddleware, upload.single('avatar'), updateUser)

export const userRoute = router