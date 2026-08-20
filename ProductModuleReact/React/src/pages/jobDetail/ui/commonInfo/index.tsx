interface JobCommonInfoProps {
  jobType?: string;

  quantity?: number;
  gender?: string;
}

function JobCommonInfo({
  jobType = "Chưa cập nhật",
  quantity = 0,
  gender = "Chưa cập nhật",
}: JobCommonInfoProps) {
  return (
    <div className="flex flex-col justify-center bg-white rounded-2xl gap-4 p-6 sm:p-8 border border-slate-100 shadow-xs">
      <h2 className="text-2xl font-semibold pb-8 border-b border-gray-100">Thông tin chung</h2>
      <div className="flex gap-4">
        <div className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full">
          <i className="fa-solid fa-briefcase"></i>
        </div>
        <div className="flex flex-col ">
          <p className="font-medium text-gray-400">Loại hình làm việc</p>
          <p className="font-bold">{jobType}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full">
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <div className="flex flex-col ">
          <p className="font-medium text-gray-400">Số lượng tuyển</p>
          <p className="font-bold">{quantity}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full">
          <i className="fa-solid fa-venus-mars"></i>
        </div>
        <div className="flex flex-col ">
          <p className="font-medium text-gray-400">Giới tính</p>
          <p className="font-bold">{gender}</p>
        </div>
      </div>
    </div>
  );
}
export default JobCommonInfo;
