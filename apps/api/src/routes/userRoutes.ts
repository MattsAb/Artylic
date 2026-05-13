import { Router } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'
import { getProfile, updateProfile } from '../controllers/userController'
import { checkLogin } from '../middleware/checkLogin'
import { createUpload } from '../config/awss3'

const router = Router()

router.get('/:id',checkLogin, getProfile)
router.put('/',authMiddleware, createUpload('avatars').single('image'), updateProfile)

export default router