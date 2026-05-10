
import type {ApiResponse, Profile} from "@artylic/types"
import { handleError } from "./utils/handleError"
import api from "./config/axios";


export async function getUserProfile (id: string): Promise<ApiResponse<Profile>> {

    try {
        const response = await api.get<ApiResponse<Profile>>(`/v1/user/${id}`)
        return response.data
    } catch (err) {
        return handleError(err);
    }

}