import { Router } from 'express'
import { likePost, unlikePost } from '../controllers/likeController'

const router = Router()

router.post('/', likePost)
router.delete('/', unlikePost)


export default router