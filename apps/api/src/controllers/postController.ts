import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { CreatePostDto } from '@artylic/types'
import { ApiError } from '../types/errorTypes'

export async function createPost(req: Request, res: Response) {
    const body: CreatePostDto = req.body
    const userId = req.user!.id

    const post = await prisma.post.create({
        data: {
            photoUrl: body.photoUrl,
            description: body.description,
            userId
        }
    })
    return res.status(201).json({ success: true, post })
}

export async function getPost(req: Request, res: Response) {
    const postId = Number(req.params.id);


    const post = await prisma.post.findUnique({
        where: {id: postId},
        include: {
            comments: true
        }
    })

    if (!post) throw new ApiError(404, 'Post not found');

    return res.status(200).json({success: true, post})

}

export async function deletePost(req: Request, res: Response) {
    const postId = Number(req.params.id)
    const userId = req.user!.id


    const result = await prisma.post.deleteMany({
        where: {
            id: postId,
            userId: userId
        }
    })
    if (result.count === 0) throw new ApiError(403, 'Forbidden')

    return res.status(200).json({ success: true })
}

export async function getFeed(req: Request, res: Response) {
    const userId = req.user!.id

    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followedId: true }
    })

    if (!following)
    {
        return res.status(200).json({success: true, posts: []})
    }

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

}