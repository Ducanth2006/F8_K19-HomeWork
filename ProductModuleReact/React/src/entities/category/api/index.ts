import api from "@/shared/api";
import type { ICatiegoryGroup } from "../model";

export const getCategoryGroup = async (
   
): Promise<ICatiegoryGroup[]> => {
    const res=await api.get("/categories");
    return res.data
};