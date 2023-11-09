import express from 'express'
import { commentPost, createPost, deleteComment, deletePost, deleteReply, getAllPost, getCommentByPostId, getPostById, likeComment, likePost, replyComment, unLikeComment, unLikePost, updatePost } from '../controller/postController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const router = express.Router()

router.post('/create-post', authMiddleware, upload, createPost)
router.put('/update-post', authMiddleware, upload, updatePost)
router.get('/get-all-post', getAllPost)
router.get('/get-post/:id', getPostById)
router.delete('/delete-post/:id', authMiddleware, deletePost)
router.post('/like-post/:id', authMiddleware, likePost)
router.delete('/unlike-post', authMiddleware, unLikePost)
router.post('/comment-post/:id', authMiddleware, commentPost)
router.delete('/delete-comment', authMiddleware, deleteComment)
router.post('/like-comment/:id', authMiddleware, likeComment)
router.put('/unlike-comment/:id', authMiddleware, unLikeComment)
router.post('/reply-comment/:id', authMiddleware, replyComment)
router.delete('/delete-reply', authMiddleware, deleteReply)
router.get('/comment/:id', authMiddleware, getCommentByPostId)

export const postRouter = router