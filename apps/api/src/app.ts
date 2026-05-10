import 'dotenv/config' 
import './config/passport'
import express from 'express';
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import followRoutes from './routes/followRoutes'
import likeRoutes from './routes/likeRoutes'
import commentRoutes from './routes/commentRoutes'
import userRoutes from './routes/userRoutes'
import { authMiddleware } from './middleware/authMIddleware';

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/user/:id/follow', authMiddleware, followRoutes)

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/post/:id/like', authMiddleware, likeRoutes)
app.use('/api/v1/post/:id/comments', authMiddleware, commentRoutes)

export default app;
