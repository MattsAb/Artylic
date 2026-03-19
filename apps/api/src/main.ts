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

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)
app.use('/api/user/:id/follow', authMiddleware, followRoutes)

app.use('/api/post', postRoutes)
app.use('/api/post/:id/like', authMiddleware, likeRoutes)
app.use('/api/post/:id/comments', authMiddleware, commentRoutes)


app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
