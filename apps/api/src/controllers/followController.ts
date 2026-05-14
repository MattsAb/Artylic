import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ApiError } from '../types/errorTypes';

export async function followUser (req: Request, res: Response) {
    const followedId = Number(req.params.id);
    const userId = req.user!.id;
    if (userId == followedId) throw new ApiError(403, "Forbidden")

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

export async function getUserFollows(req: Request, res: Response) {
    const userId = req.user!.id

    const users = await prisma.follow.findMany({
        where: { followerId: userId },
        include: {
            followed: {
                select: {
                    avatarUrl: true,
                    username: true,
                }
            }
        }
    })

    return res.status(200).json({success: true, data: users})

}