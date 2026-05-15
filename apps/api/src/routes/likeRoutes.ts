import { Router } from 'express'
import { getLikedPosts, likePost, unlikePost } from '../controllers/likeController'
import { authMiddleware } from '../middleware/authMIddleware'

const router = Router({ mergeParams: true })


router.post('/', likePost)
router.delete('/', unlikePost)
router.get('/', authMiddleware, getLikedPosts)


export default router