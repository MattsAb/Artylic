import { Router } from 'express'
import { createPost, deletePost, editPost, getFeed, getPost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMIddleware'
import { createUpload } from '../config/awss3'
import { checkLogin } from '../middleware/checkLogin'

const router = Router()

router.get('/', authMiddleware, getFeed)
router.get('/:id',checkLogin, getPost)
router.post('/', authMiddleware, createUpload("posts").single('image') , createPost)
router.put('/:id', authMiddleware, createUpload('posts').single('image'), editPost)
router.delete('/:id', authMiddleware, deletePost)



export default router