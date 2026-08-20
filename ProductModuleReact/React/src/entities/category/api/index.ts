import api from "@/shared/api";
import type { ICatiegoryGroup } from "../model";
import type { PaginatedResponse } from "@/shared/types/pagination"
export const getCategoryGroup = async (
    page: number = 1,
    limit: number = 6
): Promise<PaginatedResponse<ICatiegoryGroup>> => {
    const res = await api.get("/category_groups", {
        params: {
            _page: page,
            _per_page: limit,
        },
    });
    const result = res.data;
    return {
        data: result?.data || [],
        pagination: {
            page: page,
            limit: limit,
            total: result?.items || 0,
            totalPages: result?.pages || 1,
        },
    };
};