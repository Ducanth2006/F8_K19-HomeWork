import { useState } from "react";
import {useNavigate} from "react-router"

import MoneyFormat from "@/shared/ui/MoneyFormat";
import type { IJobCard } from "../../model/types";

function Card({
    id,
    title,
    experience_level,
    quantity,
    salary,
    is_hot,
    company,
    slug,
}: IJobCard) {
    const [heart, setHeart] = useState<boolean>(false);
    const navigate =useNavigate();
    const handleNav=()=>{
        navigate(`/cong-viec/${slug}`)
    }

    return (
        <div onClick={handleNav} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 w-full bg-white hover:bg-emerald-50/20 border border-slate-100 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl gap-4">
            <div className="flex gap-4 items-center flex-1 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-slate-100 bg-slate-50 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                        className="w-full h-full object-contain rounded-lg"
                        src={company.logo_url}
                        alt={company.short_name}
                    />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        {is_hot && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white tracking-wide uppercase">
                                HOT
                            </span>
                        )}
                        <h4 className="text-sm sm:text-base text-slate-800 font-semibold truncate group-hover:text-emerald-600 transition-colors">
                            {title}
                        </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">{company.short_name}</p>
                    <div className="flex flex-wrap gap-2 items-center mt-1">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                            {experience_level}
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md">
                            Tuyển: {quantity}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex sm:flex-col justify-between sm:items-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <p className="font-bold text-emerald-600 text-sm sm:text-base">
                    <span><MoneyFormat amount={salary.min} showRawTooltip={false} /></span>
                    <span className="mx-0.5">-</span>
                    <span><MoneyFormat amount={salary.max} showRawTooltip={false} /></span>
                </p>
                <div className="flex gap-2.5 items-center">
                    <button className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all shadow-xs shadow-emerald-600/20">
                        Ứng tuyển
                    </button>
                    <button
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                            !heart
                                ? "border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50"
                                : "border-rose-200 bg-rose-50 text-rose-500"
                        }`}
                        onClick={() => setHeart(!heart)}
                    >
                        <i
                            className={
                                !heart
                                    ? "fa-regular fa-heart text-sm"
                                    : "fa-solid fa-heart text-sm text-rose-500"
                            }
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Card;
