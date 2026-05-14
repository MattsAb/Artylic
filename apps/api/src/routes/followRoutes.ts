import { Router } from 'express'
import { followUser, getUserFollows, unfollowUser } from '../controllers/followController'
import { authMiddleware } from '../middleware/authMIddleware'


const router = Router({ mergeParams: true })


router.post('/', followUser)
router.delete('/', unfollowUser)
router.get('/', authMiddleware, getUserFollows)


export default router