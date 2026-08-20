interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="max-w-2xl w-full bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden my-auto">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-white  p-1 shadow-2xl shadow-amber-500/20">
        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center border-2 border-slate-900">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25f7e71b-9a01-4621-837e-f8195f01378f/dfeeg56-f641c927-e03e-4319-806a-8c741491c2e3.png/v1/fill/w_894,h_894/ai_la_trieu_phu_logo_2008_by_ldd080203_dfeeg56-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiIvZi8yNWY3ZTcxYi05YTAxLTQ2MjEtODM3ZS1mODE5NWYwMTM3OGYvZGZlZWc1Ni1mNjQxYzkyNy1lMDNlLTQzMTktODA2YS04Yzc0MTQ5MWMyZTMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.V06NDrgLhB1Ee4WZ3EE4eqWYw9FNiw0AOizxt7fpamg"
            alt="Anh ai la trieu phu"
          />
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-amber-300 mb-3 tracking-wide">
        AI LÀ TRIỆU PHÚ
      </h2>
      <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
        Hãy chuẩn bị tinh thần bước vào ghế nóng, vượt qua 15 câu hỏi kiến thức
        phong phú và giành lấy tiền thưởng <b>150.000.000 VNĐ</b>!
      </p>

      <button
        onClick={onStart}
        className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-lg rounded-xl shadow-lg shadow-amber-500/30 transform hover:scale-105 transition-all duration-200"
      >
        BẮT ĐẦU VÀO GHẾ NÓNG <i className="fa-solid fa-play ml-2"></i>
      </button>
    </div>
  );
};
