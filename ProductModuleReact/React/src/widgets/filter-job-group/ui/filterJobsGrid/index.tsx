import { type JobCardHomePageDatas } from "@/entities/job";
import { HomeJobCard } from "@/entities/job";
import Pagination from "@/shared/ui/Pagination";
interface FilterJobsGridProps {
  jobs: JobCardHomePageDatas[];
  currentPage: number;
  totalPage: number;
  onPageChange: (num: number) => void;
}

function FilterJobsGrid({
  jobs,
  currentPage,
  totalPage,
  onPageChange,
}: FilterJobsGridProps) {
  return (
    <div className="flex flex-col min-h-150">
      <div className="mt-5 pb-5 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4">
        {jobs.map((job) => {
          return <HomeJobCard key={job.id} job={job} />;
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} className="text-xl"/>
    </div>
  );
}

export default FilterJobsGrid;
