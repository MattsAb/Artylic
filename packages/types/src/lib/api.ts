import { User } from "./user"

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

export interface AuthResponse {
    success: boolean
    token: string
    user: User
}