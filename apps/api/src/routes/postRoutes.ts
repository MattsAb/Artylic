import { Router } from 'express'
import { createPost, deletePost, getFeed, getPost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMIddleware'

const router = Router()

router.get('/', authMiddleware, getFeed)
router.get('/:id', getPost)
router.post('/create', authMiddleware, createPost)
router.delete('/delete/:id', authMiddleware, deletePost)



export default router