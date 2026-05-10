import axios from "axios"
import type { ApiResponse } from "@artylic/types"

export function handleError(err: unknown): ApiResponse<never> {
    if (axios.isAxiosError(err)) {
        return {
            success: false,
            error: err.response?.data?.message ?? 'Something went wrong'
        }
    }
    return { success: false, error: 'Something went wrong' }
}