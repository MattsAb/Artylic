import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export async function followUser (req: Request, res: Response) {
    const followedId = Number(req.params.id);
    const userId = req.user!.id;
    try {
        await prisma.follow.create({
            data: {
                followerId: userId,
                followedId: followedId
            }
        })

       return res.status(201).json({success: true}) 
    } catch (err)
    {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function unfollowUser(req: Request, res: Response) {
    const followedId = Number(req.params.id)
    const userId = req.user!.id

    try {
        await prisma.follow.delete({
            where: {
                followerId_followedId: {
                    followerId: userId,
                    followedId: followedId
                }
            }
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}