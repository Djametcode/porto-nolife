import express from 'express'
import { commentPost, createPost, deleteComment, deletePost, deleteReply, getAllPost, getCommentByPostId, getMyPost, getPostById, likeComment, likePost, replyComment, searchSomething, unLikeComment, unLikePost, updatePost } from '../controller/postController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'
const router = express.Router()

router.post('/create-post', authMiddleware, upload.single('file'), createPost)
router.put('/update-post', authMiddleware, upload.single('file'), updatePost)
router.get('/get-all-post', getAllPost)
router.get('/get-post/:id', authMiddleware, getPostById)
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
router.get('/my-post', authMiddleware, getMyPost)
router.get('/search', authMiddleware, searchSomething)

export const postRouter = router