import { Router } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'
import { getProfile, updateProfile } from '../controllers/userController'
import { checkLogin } from '../middleware/checkLogin'

const router = Router()

router.get('/:id',checkLogin, getProfile)
router.put('/:id',authMiddleware, updateProfile)

export default router