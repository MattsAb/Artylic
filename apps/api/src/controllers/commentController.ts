import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { CreateCommentDto } from '@artylic/types';

export async function createComment (req: Request, res: Response) {

    const { body: commentBody }: CreateCommentDto = req.body
    const postId = Number(req.params.id);
    const userId = req.user!.id;

    try {
        const comment = await prisma.comment.create({
            data: {
                userId: userId,
                postId: postId,
                body: commentBody
            }
        })

       return res.status(201).json({success: true, comment}) 
    } catch (err)
    {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function deleteComment(req: Request, res: Response) {
    const commentId = Number(req.params.commentId)
    const userId = req.user!.id

    try {
        const comment = await prisma.comment.deleteMany({
            where: {
                id: commentId,
                userId: userId
            }
        })

        if (comment.count === 0)
            return res.status(403).json({ success: false, message: 'Forbidden' })

        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}