import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";

import {  type IJobCard, Card,getJobs } from "@/entities/job";

function ListJobPage() {
  const [jobs, setJobs] = useState<IJobCard[] | null>();
  const [isLoading,setLoading] =useState<boolean>(true)
  // query search params
  const [searchParams]=useSearchParams();
  const page=Number(searchParams.get("page"))||1
  const keyWord=searchParams.get("keyword")||undefined
  const categorySlug=searchParams.get("category_slug")||undefined
  const cityId=Number(searchParams.get("city_id"))||undefined

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result=await getJobs({page,category_slug:categorySlug,keyword:keyWord,city_id:cityId})
        setJobs(result.data);
      } catch (e) {
        console.log("errror :", e);
      }
    };
    fetchJobs();
  }, [page,keyWord,categorySlug,cityId]);
 const displayTitle = keyWord
    ? `từ khóa "${keyWord}"`
    : categorySlug
    ? `ngành "${categorySlug}"`
    : "tất cả ngành nghề";
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
      {/* 2 dải viền background emerald 2 bên lề */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-emerald-200/40 via-emerald-100/20 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-emerald-200/40 via-emerald-100/20 to-transparent blur-2xl" />

      {/* Đường border accent emerald nhẹ nhàng chạy dọc 2 mép */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />

      {/* Content chính ở giữa */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
        {/* Header tìm kiếm */}
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
            Kết quả tìm kiếm cho:{" "}
            <span className="inline-block rounded-xl bg-emerald-500/10 px-3.5 py-1 text-emerald-600 ring-1 ring-emerald-500/30">
              {displayTitle}
            </span>
          </h1>
        </div>

        {/* Danh sách kết quả */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <h2 className="text-lg font-semibold text-slate-700 sm:text-xl">
              Danh sách việc làm
            </h2>
            {Array.isArray(jobs) && (
              <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-400/30">
                Tìm thấy <strong className="text-emerald-600">{jobs.length}</strong> việc làm
              </span>
            )}
          </div>

          {Array.isArray(jobs) && jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-xl font-medium text-slate-500">
                Không tìm thấy việc làm phù hợp
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.isArray(jobs) &&
                jobs?.map((j, idx) => (
                  <div key={j.id || idx} className="h-full">
                    <Card {...j} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListJobPage;