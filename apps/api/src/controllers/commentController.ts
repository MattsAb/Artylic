import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { CreateCommentDto } from '@artylic/types';
import { ApiError } from '../types/errorTypes';

export async function createComment (req: Request, res: Response) {

    const { body: commentBody }: CreateCommentDto = req.body

    if (!commentBody) return res.status(400).json({ success: false, message: 'Comment body is required' })

    const postId = Number(req.params.id);
    const userId = req.user!.id;

    const comment = await prisma.comment.create({
        data: {
            userId: userId,
            postId: postId,
            body: commentBody
        },
        include: {
        user: {
            select: { id: true, username: true, avatarUrl: true }
        }
    }
    })

    return res.status(201).json({success: true, data: comment}) 

}

export async function deleteComment(req: Request, res: Response) {
    const commentId = Number(req.params.commentId)
    const userId = req.user!.id

    const comment = await prisma.comment.deleteMany({
        where: {
            id: commentId,
            userId: userId
        }
    })

    if (comment.count === 0) throw new ApiError(403, 'Forbidden');

    return res.status(200).json({ success: true })
}