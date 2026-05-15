import { Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { checkAuth, loginUser, registerUser } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMIddleware'
import { User } from '@artylic/types'

const router = Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/check', authMiddleware, checkAuth)

router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false
    })
)
router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: 'http://localhost:5173/',
        session: false
     }),
    (req, res) => {
        const user = req.user as User
        const token = jwt.sign(
            { id: user.id, email: user.email  },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )
        res.redirect(`http://localhost:5173?token=${token}`)
    }
)

router.get('/me', authMiddleware, (req, res) => {
    return res.status(200).json({ success: true, data: req.user })
})

export default router