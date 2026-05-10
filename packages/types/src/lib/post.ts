import { Comment } from './comment.js'
import { Like } from './like.js'
import type { User } from './user.js'

export interface Post {
    id: number
    photoUrl: string
    description: string
    createdAt: string
    userId: number
    user: User
    likes: Like[]
    comments: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}

export interface CreatePostDto {
    description: string
    photoUrl: string
}