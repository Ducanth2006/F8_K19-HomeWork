interface LifelinesProps {
    usedLifelines: { [key: string]: boolean };
    onUse: (type: string) => void;
}

export const Lifelines = ({ usedLifelines, onUse }: LifelinesProps) => {
    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 flex justify-around items-center gap-2 shadow-lg">
            <button disabled={usedLifelines['5050']} onClick={() => onUse('5050')} className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-amber-300">
                <i className="fa-solid fa-percent text-base sm:text-lg"></i>
                <span>50:50</span>
            </button>
            <button disabled={usedLifelines['phone']} onClick={() => onUse('phone')} className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-sky-300">
                <i className="fa-solid fa-phone text-base sm:text-lg"></i>
                <span className="hidden md:inline">Người thân</span>
            </button>
            <button disabled={usedLifelines['audience']} onClick={() => onUse('audience')} className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-emerald-300">
                <i className="fa-solid fa-users text-base sm:text-lg"></i>
                <span className="hidden md:inline">Khán giả</span>
            </button>
            <button disabled={usedLifelines['switch']} onClick={() => onUse('switch')} className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-purple-300">
                <i className="fa-solid fa-arrows-rotate text-base sm:text-lg"></i>
                <span className="hidden md:inline">Đổi câu hỏi</span>
            </button>
        </div>
    );
};