import type { User } from "./user.js"

export interface Follow {
    id: number
    followerId: number
    follower: User
    followedId: number
    followed: User
}