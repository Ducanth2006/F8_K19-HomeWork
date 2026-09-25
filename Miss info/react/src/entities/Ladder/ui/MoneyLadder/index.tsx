interface MoneyLadderProps {
    currentLevel: number;
    prizeLadder: string[];
}

export const MoneyLadder = ({ currentLevel, prizeLadder }: MoneyLadderProps) => {
    return (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thang tiền thưởng</span>
                <i className="fa-solid fa-ranking-star text-amber-400"></i>
            </div>
            <div className="space-y-1 text-sm font-bold max-h-[380px] lg:max-h-none overflow-y-auto custom-scrollbar pr-1 flex flex-col-reverse">
                {prizeLadder.map((prize, idx) => {
                    const isMilestone = (idx === 4 || idx === 9 || idx === 14);
                    const isCurrent = (idx === currentLevel);
                    const isPassed = (idx < currentLevel);
                    
                    let itemClass = "flex justify-between items-center px-3 py-1.5 rounded-lg border transition-all duration-300 ";
                    if (isCurrent) itemClass += "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black border-amber-300 shadow-md scale-[1.02]";
                    else if (isPassed) itemClass += "bg-slate-950/40 text-amber-500/60 border-slate-900";
                    else if (isMilestone) itemClass += "bg-slate-800/80 text-amber-300 border-amber-500/40 font-extrabold";
                    else itemClass += "text-slate-400 border-transparent hover:bg-slate-800/40";

                    return (
                        <div key={idx} className={itemClass}>
                            <span className={`text-xs ${isCurrent ? 'text-slate-950' : 'text-slate-500'}`}>Câu {idx + 1}</span>
                            <span className={isMilestone && !isCurrent ? 'text-amber-300 font-black' : ''}>{prize} đ</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};