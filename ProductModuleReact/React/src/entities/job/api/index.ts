import api from "@/shared/api";
export const getJobByCompanyId = async (id: string) => {
    try {
        const res = await api.get(`/jobs?company.id=${id}`)
        return res.data;
    } catch (e) {
        console.log("Lỗi khi get job by company id")
    }
}