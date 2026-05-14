import type { ApiResponse, Follow} from "@artylic/types"
import { handleError } from "./utils/handleError"
import api from "./config/axios";


export async function followUser(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.post<ApiResponse<null>>(`/v1/user/${id}/follow`)

        return response.data

    } catch (err) {
        return handleError(err);
    }
}


export async function unfollowUser(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.delete<ApiResponse<null>>(`/v1/user/${id}/follow`)

        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function getFollows(id: string): Promise<ApiResponse<Follow[]>> {
    try{
        const response = await api.get<ApiResponse<Follow[]>>(`/v1/user/${id}/follow`)

        return response.data

    } catch (err) {
        return handleError(err);
    }
}