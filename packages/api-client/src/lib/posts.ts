import type { ApiResponse, Post } from "@artylic/types"
import { handleError } from "./utils/handleError"
import api from "./config/axios";

export async function createPost(description: string, imageFile: File): Promise<ApiResponse<Post>> {
    try {
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('description', description)

        const response = await api.post('/v1/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err);
    }
}

export async function getPost(id: string): Promise<ApiResponse<Post>>{
    try{
        const response = await api.get<ApiResponse<Post>>(`/v1/posts/${id}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function getFeed(): Promise<ApiResponse<Post[]>>{
    try{
        const response = await api.get<ApiResponse<Post[]>>(`/v1/posts`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}


