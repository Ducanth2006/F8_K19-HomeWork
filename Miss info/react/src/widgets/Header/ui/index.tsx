interface HeaderProps {
  isPlaying: boolean;
  timeLeft: number;
  onWalkAway: () => void;
}

export const Header = ({ isPlaying, timeLeft, onWalkAway }: HeaderProps) => {
  return (
    <header className="w-full bg-slate-900/80 border-b border-indigo-900/50 p-4 sticky top-0 z-30 backdrop-blur">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full  bg-linear-to-r from-yellow-500 to-amber-300 flex items-center justify-center shadow-lg border border-white">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25f7e71b-9a01-4621-837e-f8195f01378f/dfeeg56-f641c927-e03e-4319-806a-8c741491c2e3.png/v1/fill/w_894,h_894/ai_la_trieu_phu_logo_2008_by_ldd080203_dfeeg56-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiIvZi8yNWY3ZTcxYi05YTAxLTQ2MjEtODM3ZS1mODE5NWYwMTM3OGYvZGZlZWc1Ni1mNjQxYzkyNy1lMDNlLTQzMTktODA2YS04Yzc0MTQ5MWMyZTMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.V06NDrgLhB1Ee4WZ3EE4eqWYw9FNiw0AOizxt7fpamg"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-yellow-400 to-amber-500">
              AI LÀ TRIỆU PHÚ
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Thử thách trí tuệ & chinh phục 150 Triệu
            </p>
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-amber-500/40">
              <i className="fa-solid fa-clock text-amber-400 animate-pulse"></i>
              <span className="font-bold text-amber-300 text-lg w-6 text-center">
                {timeLeft}
              </span>
              s
            </div>
            <button
              onClick={onWalkAway}
              className="bg-rose-900/60 hover:bg-rose-700 text-rose-200 border border-rose-500/50 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <i className="fa-solid fa-person-walking-arrow-right text-base"></i>
              <span>Dừng cuộc chơi</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
