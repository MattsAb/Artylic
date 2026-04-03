import { Router } from 'express'
import passport from 'passport'
import { deleteUser, loginUser, registerUser } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMIddleware'

const router = Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.delete('/delete', authMiddleware, deleteUser)


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/google/callback',
)

export default router