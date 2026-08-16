import api from "@/shared/api";
import type { ICompanyCard, ICompanyDetail } from "../model/types"
export const getCompaniesById = async (id: string): Promise<ICompanyDetail | null> => {
    try {
        const res = await api.get(`/companies/${id}`)
        return res.data
    } catch (e) {
        console.log("Lỗi khi get companies")
    }
}
export const getCompanies = async (): Promise<ICompanyCard | null> => {
    try {
        const res = await api.get("/companies")
        return res.data;
    } catch (e) {
        console.log("get companies api has error: ", e)
    }
}