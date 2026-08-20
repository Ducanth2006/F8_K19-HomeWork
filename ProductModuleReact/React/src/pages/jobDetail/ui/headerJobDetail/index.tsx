import type { ExperienceLevel, Salary } from "@/entities/job/model/types";
import type { Address } from "@/shared/types/location";
import MoneyFormat from "@/shared/ui/MoneyFormat";
import {parseTimeVn} from "@/shared/lib/parseTimeToVn"
interface HeaderJobDetailProps {
  title?: string;
  experience_level?: string;
  salary?: Salary;
  work_location?: Address[];
  deadline?: string;
}
function HeaderJobDetail({
  title,
  experience_level,
  salary,
  work_location,
  deadline,
}: HeaderJobDetailProps) {
  return (
    <div className="flex flex-col  bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
      <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
        {title}
      </h2>
      <h3 className="text-xl self-center lg:self-start text-emerald-600 font-bold  mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
        <i className="fa-solid lg:text-2xl fa-money-bill"></i>
        <span className="inline-flex text-sm items-center px-2.5 py-2 bg-emerald-50 text-emerald-700 rounded-lg  font-semibold border border-emerald-100/80  lg:text-xl">
          <MoneyFormat
            className="pr-0.5 lg:text-xl"
            amount={salary?.min ?? 0}
          />{" "}
          -
          <MoneyFormat
            className="pl-0.5 pr-0.5  lg:text-xl mr-2"
            amount={salary?.max ?? 0}
          />
          <p className=" lg:text-xs">{salary?.currency}</p>
        </span>
      </h3>
      <div className="flex justify-between text-sm lg:text-lg ">
        <div className="flex gap-1 ">
          <i className=" text-2xl lg:text-4xl text-emerald-600 fa-solid fa-building self-center"></i>
          <div className="flex flex-col gap-1">
            <p>Địa điểm:</p>
            <p className="font-semibold">
              {work_location?.[0].city_name ?? "Chưa cập nhật!!"}
            </p>
          </div>
        </div>
        <div className="flex gap-1 ">
          <i className="text-2xl lg:text-4xl text-emerald-600 fa-solid fa-medal self-center"></i>
          <div className="flex flex-col gap-1">
            <p>Kinh nghiệm:</p>
            <p className="font-semibold">
              {experience_level ?? "Chưa cập nhật!!"}
            </p>
          </div>
        </div>
        <div className="hidden lg:flex gap-1 ">
          <i className="text-2xl lg:text-4xl text-emerald-600 fa-solid fa-calendar self-center"></i>
          <div className="flex flex-col gap-1">
            <p>Hạn ứng tuyển:</p>
            <p className="font-semibold text-emerald-600">
              {parseTimeVn(deadline) ?? "Chưa cập nhật!!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderJobDetail;
