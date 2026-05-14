
export interface User {
    id: number
    email: string
    username: string
    bio?: string | null
    avatarUrl?: string | null
    provider: string
    createdAt: string
    _count?: {
        followers: number
        posts: number
    }
}

export interface UpdateUserDto {
    bio?: string
    avatarUrl?: string
}

export interface RegisterUserDto {
    username: string
    email: string
    password: string
}

export interface LoginUserDto {
    email: string
    password: string
}

