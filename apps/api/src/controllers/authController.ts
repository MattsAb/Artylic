import {Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma'
import passport from 'passport'

const generateToken = (user: { id: number, email: string }) => jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
)

export async function registerUser  (req: Request, res: Response) {
    const { email, username, password } = req.body
    try {
        const searchedUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (searchedUser)
        {
            return res.status(400).json({ message: 'Email already taken' })
        }

        const hashed = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
            data: { email, username, password: hashed, provider: 'local' }
        })
        return res.status(201).json({ token: generateToken(user) })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export async function loginUser (req: Request, res: Response) {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password)
        return res.status(401).json({ message: 'User not found' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' })

    return res.status(200).json({ token: generateToken(user) })
}

export function googleAuth () { 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req: Request, res: Response) => {
        const token = generateToken(req.user as { id: number, email: string })
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`)
    }}