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

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/user/:id/follow', authMiddleware, followRoutes)

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/post/:id/like', authMiddleware, likeRoutes)
app.use('/api/v1/post/:id/comments', authMiddleware, commentRoutes)

app.use((req, res) => {
  res.status(200).json("nothing here");
});

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
