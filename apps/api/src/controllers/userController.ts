import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { UpdateUserDto } from '@artylic/types'
import { ApiError } from '../types/errorTypes'

export async function getProfile(req: Request, res: Response) {
    const profileId = Number(req.params.id);
    const userId = req.user?.id;

    const profile = await prisma.user.findUnique({
        where: { id: profileId },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true,
            posts: {
                include: {
                    user: true,
                    _count: {
                        select: {likes: true}
                    }
                },
                orderBy: { createdAt: 'desc' },
            },
            _count: {
                select: {
                    followers: true,
                    posts: true
                }
            },
            followers: {
            where: { followerId: userId },
            select: { followerId: true }
        },
        }
    })

    if (!profile) throw new ApiError(404, 'User not found');

    return res.status(200).json({success: true, data: profile})

}

export async function updateProfile(req: Request, res: Response) {
    const userId = req.user!.id
    const body: UpdateUserDto = req.body
    const file = req.file as Express.MulterS3.File | undefined
    console.log('hey')

    const profile = await prisma.user.update({
        where: { id: userId },
        data: {
            ...(body.bio !== undefined && { bio: body.bio }),
            ...(file && { avatarUrl: file.location }),
        },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true
        }
    })

    return res.status(200).json({ success: true, data: profile })
}