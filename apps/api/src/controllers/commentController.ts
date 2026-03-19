import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { CreateCommentDto } from '@artylic/shared-types';

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

export async function deleteComment (req: Request, res: Response) {
    
    const commentId = Number(req.params.commentId);

    try {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })

       return res.status(201).json({success: true, comment}) 
    } catch (err)
    {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}