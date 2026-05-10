import type { ApiResponse, AuthResponse, LoginUserDto, RegisterUserDto, User } from "@artylic/types"
import api from "./config/axios";
import { handleError } from "./utils/handleError";

export async function login({email, password}: LoginUserDto): Promise<ApiResponse<AuthResponse>> {
    try{
        const response = await api.post<AuthResponse>('/v1/auth/login', {
            email,
            password
        })
       return { success: true, data: response.data }
    }
    catch (err) {
        return handleError(err);
    }
}

export async function register({email, username, password}: RegisterUserDto): Promise<ApiResponse<AuthResponse>> {

    try {
        const response = await api.post<AuthResponse>('/v1/auth/register', {
            email,
            username,
            password
        })
        return {success: true, data: response.data}

    } catch (err) {
        return handleError(err);
    }


}

export async function check(): Promise<ApiResponse<AuthResponse>> {
    try {
        const response = await api.get<AuthResponse>('v1/auth/check')
        return {success: true, data: response.data}
    } catch (err) {
        return handleError(err);
    }
}

export async function googleAuth() {
    try {
       window.location.href = `http://localhost:3000/api/v1/auth/google`
    } catch (err) {
        return handleError(err);
    }
}

export async function getMe(token: string): Promise<ApiResponse<User>> {
    try {
        const response = await api.get('/v1/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (err) {
        return handleError(err)
    }
}