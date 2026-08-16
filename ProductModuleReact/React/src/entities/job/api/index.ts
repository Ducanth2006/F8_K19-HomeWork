import api from "@/shared/api";
import type { IJobCard } from "../model/types"
export const getJobByCompanyId = async (id: string): Promise<IJobCard[] | undefined> => {
    try {
        const res = await api.get(`/jobs?company.id=${id}`)
        return res.data;
    } catch (e) {
        console.log("Lỗi khi get job by company id")
    }
}