import type { ApiResponse, Comment } from "@artylic/types"
import { handleError } from "./utils/handleError"
import api from "./config/axios";


export async function postComment(id: string, comment: string): Promise<ApiResponse<Comment>> {
    try{
        const response = await api.post<ApiResponse<Comment>>(`/v1/post/${id}/comments`, {
            body: comment
        })
        return response.data

    } catch (err) {
        return handleError(err);
    }
}