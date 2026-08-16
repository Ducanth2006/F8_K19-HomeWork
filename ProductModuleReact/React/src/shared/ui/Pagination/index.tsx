import type { PaginationProps } from "@/shared/types/pagination";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = " "
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <div className={`flex items-center justify-center space-x-2 mt-auto  border-t border-t-black ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="font-bold text-green-400 hover:text-green-500   cursor-pointer"
      >
        Trước
      </button>
      <p>{currentPage}/{totalPages}</p>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="font-bold text-green-400 hover:text-green-500   cursor-pointer"
      >
        Sau
      </button>
    </div>
  );
}
export default Pagination