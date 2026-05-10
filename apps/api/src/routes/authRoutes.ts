import { Router } from 'express'
import passport from 'passport'
import { loginUser, registerUser } from '../controllers/authController'

const router = Router()

router.post('/register', registerUser)

router.post('/login', loginUser)


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/google/callback',
)

export default router