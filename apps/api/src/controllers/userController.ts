import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { UpdateUserDto } from '@artylic/shared-types'

export async function getProfile(req: Request, res: Response) {
    const userId = Number(req.params.id)

    try {
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
                    include: {
                        _count: {
                            select: { likes: true, comments: true }
                        }
                    }
                },
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        posts: true
                    }
                }
            }
        })

        if (!profile)
            return res.status(404).json({ success: false, message: 'User not found' })

        return res.status(200).json({ success: true, profile })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function updateProfile(req: Request, res: Response) {
    const userId = req.user!.id
    const body: UpdateUserDto = req.body

    try {
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
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}