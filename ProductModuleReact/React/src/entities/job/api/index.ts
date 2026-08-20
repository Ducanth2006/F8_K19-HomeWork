import api from "@/shared/api";
import type { PaginatedResponse } from "@/shared/types/pagination";
import type { JobCardHomePageDatas,JobDetailPage } from "@/entities/job";
export const getJobByCompanyId = async (id: string) => {
  try {
    const res = await api.get(`/jobs?company.id=${id}`);
    return res.data;
  } catch (e) {
    console.log("Lỗi khi get job by company id");
  }
};
export const getJobByTagLevelExp = async (
  page: number = 1,
  limit: number = 9,
  exp: string = "Chưa có kinh nghiệm",
): Promise<PaginatedResponse<JobCardHomePageDatas>> => {
  const res = await api.get(
    `/jobs?experience_level=${encodeURIComponent(exp)}`,
    { params: { _page: page, _per_page: limit } },
  );
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
export const getJobByTagJobType = async (
  page: number = 1,
  limit: number = 9,
  jobType: string = "FULL_TIME",
): Promise<PaginatedResponse<JobCardHomePageDatas>> => {
  const res = await api.get(
    `/jobs?job_type=${encodeURIComponent(jobType)}`,
    { params: { _page: page, _per_page: limit } },
  );
  const result = res.data;
  return {
    data: result?.data || [],
    pagination: {
      page: page,
      limit: limit,
      total: result?.items || 0,
      totalPages: result?.pages || 1
    }
  }
};
export const getJobByGenderTag = async (
  page: number = 1,
  limit: number = 9,
  gender: string = "NOT_REQUIRED",
): Promise<PaginatedResponse<JobCardHomePageDatas>> => {
  const res = await api.get(
    `/jobs?gender=${encodeURIComponent(gender)}`,
    { params: { _page: page, _per_page: limit } },
  );
  const result = res.data;
  return {
    data: result?.data || [],
    pagination: {
      page: page,
      limit: limit,
      total: result?.items || 0,
      totalPages: result?.pages || 1
    }
  }
}
export const getJobBySlug= async(slug:string):Promise<JobDetailPage|null>=>{
  const res=await  api.get<JobDetailPage[]>(`/jobs?slug=${slug}`);
  return res.data.length>0?res.data[0]:null;
}
