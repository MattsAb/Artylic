import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { UpdateUserDto } from '@artylic/types'
import { ApiError } from '../types/errorTypes'

export async function getProfile(req: Request, res: Response) {
    const userId = Number(req.params.id)

    const profile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true,
            posts: {
                orderBy: { createdAt: 'desc' },
            },
            _count: {
                select: {
                    followers: true,
                    posts: true
                }
            }
        }
    })

    if (!profile) throw new ApiError(404, 'User not found');

    return res.status(200).json({success: true, data: profile})

}

export async function updateProfile(req: Request, res: Response) {
    const userId = req.user!.id
    const body: UpdateUserDto = req.body

    const profile = await prisma.user.update({
        where: { id: userId },
        data: {
            bio: body.bio,
            avatarUrl: body.avatarUrl
        },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true
        }
    })
    return res.status(200).json({ success: true, profile })

}