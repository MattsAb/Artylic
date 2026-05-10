import { Post } from "./post.js"
import { User } from "./user.js"

export interface Like {
    id: number
    userID: number
    user: User
    postID: number
    post: Post
}