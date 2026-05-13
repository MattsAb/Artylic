import { Router } from 'express'
import { followUser, unfollowUser } from '../controllers/followController'

const router = Router({ mergeParams: true })

router.post('/', followUser)
router.delete('/', unfollowUser)


export default router