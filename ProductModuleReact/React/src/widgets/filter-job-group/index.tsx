import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"

import {
  type JobCardHomePageDatas,
  HomeJobCard,
  getJobByTagLevelExp,
  getJobByGenderTag,
  getJobByTagJobType,
} from "@/entities/job";
import FilteredBar from "./ui/filteredBar";
import { type FilterTagProps, FilteredTag } from "@/features/filteredTag";
import FilterJobsGrid from "./ui/filterJobsGrid";
interface FilterState {
  type: keyof FilterTagProps;
  value: string;
}
function FilteredJobGroup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = (searchParams.get("type") as keyof FilterTagProps) || "exp";
  const filterValue = searchParams.get("value") || FilteredTag.exp[0];
  const currentPage = Number(searchParams.get("page")) || 1




  const [totalpages, setTotalPages] = useState(1);
  const [jobs, setJobs] = useState<JobCardHomePageDatas[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const hanldeFilterChange = (type: keyof FilterTagProps, value: string) => {
    setSearchParams({ type, value, page: "1" });
  };
  const handlePageChange = (num: number) => {
    setSearchParams({ type: filterType, value: filterValue, page: num.toString() })
  }
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let res;
        switch (filterType) {
          case "exp":
            res = await getJobByTagLevelExp(currentPage, 9, filterValue);
            break;
          case "gender":
            res = await getJobByGenderTag(currentPage, 9, filterValue);
            break;
          case "jobType":
            res = await getJobByTagJobType(currentPage, 9, filterValue);
        }
        if (res?.data) setJobs(res.data);

        setTotalPages(res.pagination.totalPages)

      } catch (error) {
        console.error("Lỗi khi fetch danh sách công việc:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filterType, filterValue, currentPage]);

  return (
    <div className="w-full py-6 min-h-165 bg-gray-100">
      <div className="container mx-auto px-3 sm:px-25 lg:px-60 ">
        <header className="text-2xl font-bold text-green-600 pb-4">
          Việc làm tốt nhất
        </header>
        <FilteredBar handleFilterJob={hanldeFilterChange} currentType={filterType} currentValue={filterValue} />
        <FilterJobsGrid jobs={jobs} currentPage={currentPage} totalPage={totalpages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
export default FilteredJobGroup;
