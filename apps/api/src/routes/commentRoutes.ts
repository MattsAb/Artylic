import { Router } from 'express'
import { createComment, deleteComment } from '../controllers/commentController';

const router = Router()

router.post('/', createComment);
router.delete('/:commentId', deleteComment);

export default router