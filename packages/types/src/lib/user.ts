export interface User {
    id: number
    email: string
    username: string
    bio?: string
    avatarUrl?: string
    provider: string
    createdAt: string
}

export interface UpdateUserDto {
    bio?: string
    avatarUrl?: string
}