import type { IJobCard } from "../../model/types";
import { useState } from "react";
import MoneyFormat from "@/shared/ui/MoneyFormat";
function Card({
    id,
    title,
    experience_level,
    quantity,
    salary,
    is_hot,
    company,
}: IJobCard) {
    const [heart, setHeart] = useState<boolean>(false);
    const isHot = () => (
        <p className="bg-red-500 text-white rounded-3xl w-10 text-center text-sm h-5">
            HOT
        </p>
    );

    return (
        <>
            <div className="flex justify-between items-center p-4 h-40 w-full bg-white hover:bg-emerald-50/20 border border-gray-200/80 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 rounded-2xl">
                <div className="flex gap-4 w-[445px] items-center">
                    <img
                        className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-xs flex-shrink-0"
                        src={company.logo_url}
                        alt={company.short_name}
                    />
                    <div className="flex flex-col gap-1.5 overflow-hidden">
                        {is_hot && isHot()}
                        <p className="text-base text-gray-900 font-semibold truncate">
                            {title}
                        </p>
                        <p className="text-sm text-gray-500">{company.short_name}</p>
                        <div className="flex gap-2 items-center">
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                {experience_level}
                            </span>
                            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md">
                                Tuyển: {quantity}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <p className="font-bold text-emerald-600 text-base">
                        <span><MoneyFormat amount={salary.min} showRawTooltip={false} /></span>
                        <span>-</span>
                        <span><MoneyFormat amount={salary.max} showRawTooltip={false} /></span>
                    </p>
                    <div className="flex gap-3 items-center">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl cursor-pointer active:scale-95 transition-all duration-150 shadow-xs">
                            Ứng tuyển
                        </button>
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 cursor-pointer transition-all"
                            onClick={() => setHeart(!heart)}
                        >
                            <i
                                className={
                                    !heart
                                        ? "fa-regular fa-heart text-base"
                                        : "fa-solid fa-heart text-base text-red-500"
                                }
                            ></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Card;
