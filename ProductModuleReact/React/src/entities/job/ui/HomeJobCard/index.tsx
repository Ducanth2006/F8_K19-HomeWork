import { useState } from "react";
import {useNavigate} from "react-router"

import type { JobCardHomePageProps } from "../../index";
import MoneyFormat from "@/shared/ui/MoneyFormat"

function JobCardHome({ job }: JobCardHomePageProps) {
    const [heart, setHeart] = useState<boolean>(false);
    const { id: JobId, company, slug, job_type, title, salary } = job;
    const { logo_url, id: CompanyId, short_name } = company;
    const { min, max, currency } = salary;
    const navigate= useNavigate();
    const handleNav=()=>{
        navigate(`/cong-viec/${slug}`)
    }
    return (
        <div onClick={handleNav} className="group  relative flex flex-col justify-between gap-4 col-span-1 rounded-2xl p-4 sm:p-5 bg-white border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            {/* Header: Logo & Job Info */}
            <div className="flex gap-3.5 items-start">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-slate-100 bg-slate-50/60 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                        src={logo_url}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                        alt={short_name}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors leading-snug">
                        {title}
                    </h3>
                    <p className="truncate text-xs font-medium text-slate-500 mt-1">
                        {short_name}
                    </p>
                </div>
            </div>

            {/* Footer: Tags & Heart Button */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                <div className="flex flex-wrap gap-2 items-center min-w-0">
                    <span className="inline-flex items-center px-2.5 py-1 bg-slate-100/90 text-slate-600 rounded-lg text-xs font-medium truncate">
                        {job_type}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100/80">
                        <MoneyFormat className="pr-0.5" amount={min} /> - <MoneyFormat className="pl-0.5 pr-0.5" amount={max} /> {currency}
                    </span>
                </div>
                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-all duration-200 shrink-0 cursor-pointer ${!heart
                            ? "border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50/50"
                            : "border-emerald-500 bg-emerald-50 text-emerald-600"
                        }`}
                    onClick={() => setHeart(!heart)}
                    title={heart ? "Bỏ lưu công việc" : "Lưu công việc"}
                >
                    <i
                        className={
                            !heart
                                ? "fa-regular fa-heart text-sm"
                                : "fa-solid fa-heart text-sm text-emerald-600"
                        }
                    ></i>
                </button>
            </div>
        </div>
    );
}
export default JobCardHome;