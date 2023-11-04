import express from 'express'
import { createPost, getAllPost, getPostById, updatePost } from '../controller/postController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const router = express.Router()

router.post('/create-post', authMiddleware, upload, createPost)
router.put('/update-post', authMiddleware, updatePost)
router.get('/get-all-post', getAllPost)
router.get('/get-post/:id', getPostById)

export const postRouter = router