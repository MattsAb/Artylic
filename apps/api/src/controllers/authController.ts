import {Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma'
import passport from 'passport'
import { ApiError } from '../types/errorTypes'

const generateToken = (user: { id: number, email: string }) => jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
)

export async function registerUser  (req: Request, res: Response) {
    const { email, username, password } = req.body

        const searchedUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (searchedUser) throw new ApiError(400, 'Email already taken')

        const hashed = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
            data: { 
                email, 
                username, 
                password: hashed, 
                provider: 'local', 
                avatarUrl: 'https://artylicpostimages-227655493868-eu-north-1-an.s3.eu-north-1.amazonaws.com/posts/icons8-male-user-30.png'
            }
        })

        return res.status(201).json({user, token: generateToken(user) })
}

export async function loginUser (req: Request, res: Response) {

    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) throw new ApiError(404, 'User not found');

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) throw new ApiError(401, 'Invalid credentials')

    return res.status(200).json({user, token: generateToken(user)})
}

export function googleAuth () { 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req: Request, res: Response) => {
        const token = generateToken(req.user as { id: number, email: string })
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`)
    }}

    export async function checkAuth (req: Request, res: Response) {

        const userId = req.user!.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ApiError(401, 'Not authenticated')

        return res.status(200).json({success: true, user})
    }