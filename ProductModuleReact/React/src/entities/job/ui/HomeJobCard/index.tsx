import { useState } from "react";
import type { JobCardHomePageProps } from "@/shared/interface";
import MoneyFormat from "@/shared/ui/MoneyFormat"

function JobCardHome({ job }: JobCardHomePageProps) {
    const [heart, setHeart] = useState<boolean>(false);
    const { id: JobId, company, slug, job_type, title, salary } = job;
    const { logo_url, id: CompanyId, short_name } = company;
    const { min, max, currency } = salary;
    return (
        <div className="flex flex-col gap-2 col-span-1 rounded-2xl p-3 bg-white">
            <div className="flex gap-2  ">
                <img src={logo_url} className="w-16 h-16" alt={short_name} />
                <div>
                    <p className="line-clamp-2  text-sm">{title}</p>
                    <p className="truncate text-xs">{short_name}</p>
                </div>
            </div>
            <div className="flex justify-between mt-auto">
                <div className="flex gap-2.5">
                    <span className="px-1 py-2.5 bg-gray-100 rounded-full text-slate-400">
                        {job_type}
                    </span>
                    <span className="px-1 py-2.5 bg-gray-100 rounded-full text-slate-400"><MoneyFormat className="p-1" amount={min} />-<MoneyFormat className="p-1" amount={max} />{currency}</span>
                </div>
                <button
                    className="w-7 h-7 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:emerald-600 hover:border-emerald-600 hover:bg-red-50 cursor-pointer transition-all"
                    onClick={() => setHeart(!heart)}
                >
                    <i
                        className={
                            !heart
                                ? "fa-regular fa-heart text-base"
                                : "fa-solid fa-heart text-base text-emerald-600"
                        }
                    ></i>
                </button>
            </div>
        </div>
    );
}
export default JobCardHome;