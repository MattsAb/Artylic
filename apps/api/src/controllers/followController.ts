import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export async function followUser (req: Request, res: Response) {
    const followedId = Number(req.params.id);
    const userId = req.user!.id;
    
    await prisma.follow.create({
        data: {
            followerId: userId,
            followedId: followedId
        }
    })

    return res.status(201).json({success: true}) 
}

export async function unfollowUser(req: Request, res: Response) {
    const followedId = Number(req.params.id)
    const userId = req.user!.id

    await prisma.follow.delete({
        where: {
            followerId_followedId: {
                followerId: userId,
                followedId: followedId
            }
        }
    })
    return res.status(200).json({ success: true })
}