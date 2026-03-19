import { Router } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'

const router = Router()

router.get('/:id',)
router.put('/:id',authMiddleware)


export default router