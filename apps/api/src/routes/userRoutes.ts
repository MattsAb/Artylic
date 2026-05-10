import { Router } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'
import { getProfile, updateProfile } from '../controllers/userController'

const router = Router()

router.get('/:id', getProfile)
router.put('/:id',authMiddleware, updateProfile)


export default router