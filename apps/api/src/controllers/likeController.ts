import { Request, Response } from 'express'
import { prisma } from '../config/prisma'

export async function likePost (req: Request, res: Response) {
    const postId = Number(req.params.id);
    const userId = req.user!.id;
    try {
        await prisma.like.create({
            data: {
                userId: userId,
                postId: postId
            }
        })

       return res.status(201).json({success: true}) 
    } catch (err)
    {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function unlikePost(req: Request, res: Response) {
    const postId = Number(req.params.id)
    const userId = req.user!.id

    try {
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId
                }
            }
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}