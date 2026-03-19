import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { CreatePostDto } from '@artylic/shared-types'

export async function createPost(req: Request, res: Response) {
    const body: CreatePostDto = req.body
    const userId = req.user!.id

    try {
        const post = await prisma.post.create({
            data: {
                photoUrl: body.photoUrl,
                description: body.description,
                userId
            }
        })
        return res.status(201).json({ success: true, post })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function getPost(req: Request, res: Response) {
    const postId = Number(req.params.id);

    try {
        const post = await prisma.post.findUnique({
            where: {id: postId},
            include: {
                comments: true
            }
        })
        return res.status(200).json({success: true, post})
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function deletePost(req: Request, res: Response) {
    const postId = Number(req.params.id);

    try {
        await prisma.post.delete({
            where: {id: postId},
        })
        return res.status(200).json({success: true})
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function getFeed(req: Request, res: Response) {
    const userId = req.user!.id

    try {
        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followedId: true }
        })

        const followingIds = following.map(f => f.followedId)

        const posts = await prisma.post.findMany({
            where: {
                userId: { in: followingIds }
            },
            include: {
                user: {
                    select: { id: true, username: true, avatarUrl: true }
                },
                comments: {
                    include: {
                        user: {
                            select: { id: true, username: true, avatarUrl: true }
                        }
                    }
                },
                _count: {
                    select: { likes: true, comments: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        })

        return res.status(200).json({ success: true, posts })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}