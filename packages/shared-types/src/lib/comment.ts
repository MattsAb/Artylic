import type { User } from './user.js'

export interface Comment {
    id: number
    body: string
    createdAt: string
    userId: number
    user: User
    postId: number
}

export interface CreateCommentDto {
    body: string
}