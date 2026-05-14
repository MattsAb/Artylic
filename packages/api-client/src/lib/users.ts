import type { ApiResponse, User } from "@artylic/types";
import api from "./config/axios";
import { handleError } from "./utils/handleError";


export async function getSearchUsers(query: string): Promise<ApiResponse<User[]>>{
    try{
        const response = await api.get<ApiResponse<User[]>>(`/v1/user/?q=${query}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}