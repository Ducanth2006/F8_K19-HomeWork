import Menu from "./ui/Menu";
function Home() {
  return (
    <>
      <div className="w-full flex flex-col h-120 bg-[linear-gradient(180deg,#002b33,rgba(0,43,51,.25)),linear-gradient(90deg,#008060_21.86%,#2bab60_78.13%)] bg-no-repeat bg-size-[100%_100%]">
        <div className="container mx-auto px-3 sm:px-25 pt-5 lg:px-60 ">
          <h1 className="text-2xl text-center text-green-400 font-semibold">
            TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả
          </h1>
          {/* Search bar */}
          <form className="flex items-center bg-white rounded-full p-1.5 shadow-xl   h-15 mt-2 text-sm">
            <input
              type="text"
              placeholder="Vị trí tuyển dụng, tên công ty"
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm ml-3"
            />

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2 py-1 rounded-full transition-colors whitespace-nowrap"
            >
              <i className="fa-solid fa-magnifying-glass mr-5"></i>
              Tìm kiếm
            </button>
          </form>
          {/* Menu nhỏ */}
          <Menu />
        </div>
      </div>
      <div className="w-ful py-6 min-h-165 bg-gray-100">
        <div className="container mx-auto px-3 sm:px-25 lg:px-60 "><header className="text-2xl font-bold text-green-600 pb-4">Việc làm tốt nhất</header></div>
      </div>
    </>
  );
}
export default Home;
