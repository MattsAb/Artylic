import { Post } from "./post"

export interface Profile {
    username: string
    id: string
    bio?: string
    avatarUrl: string
    createdAt: string
    posts: Post[]
    _count: {
        posts: number
        followers: number
    }

}