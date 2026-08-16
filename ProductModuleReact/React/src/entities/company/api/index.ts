import api from "@/shared/api";
export const getCompaniesById = async (id: string)=> {
    try {
        const res = await api.get(`/companies/${id}`)
        return res.data
    } catch (e) {
        console.log("Lỗi khi get companies")
    }
}
export const getCompanies = async () => {
    try {
        const res = await api.get("/companies")
        return res.data;
    } catch (e) {
        console.log("get companies api has error: ", e)
    }
}