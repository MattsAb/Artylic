import { Router } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'
import { getProfile, getSearchUsers, updateProfile } from '../controllers/userController'
import { checkLogin } from '../middleware/checkLogin'
import { createUpload } from '../config/awss3'

const router = Router()

router.get('/:id',checkLogin, getProfile)
router.get('/', getSearchUsers )
router.put('/',authMiddleware, createUpload('avatars').single('image'), updateProfile)

export default router