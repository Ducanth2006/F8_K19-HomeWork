import { useNavigate } from "react-router";

function GlobalHeader() {
  const navigate = useNavigate();
  const handleNavigateToCompany =()=>{
    navigate("/cong-ty")
  }
  return (
    <>
      <header className=" bg-white flex justify-between p-2 text-sm">
        {/* Left header */}
        <div className="flex items-center gap-2 lg-gap-4">
          <img
            src="https://static.topcv.vn/v4/image/logo/topcv-logo-7.png"
            className="h-13 w-auto object-contain"
            alt="TopCV Logo"
          />
          <ul className="flex gap-10">
            <li onClick={handleNavigateToCompany} className=" relative font-semibold  text-[14px] pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer">
              Công ty
            </li>
            <li className=" relative font-semibold  text-[14px] pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer">
              Tạo Cv
            </li>
            <li className=" relative font-semibold  text-[14px] pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer">
              Công cụ
            </li>
          </ul>
        </div>
        {/* Right header */}
        <div></div>
      </header>
      {/*  <div className="w-full h-100 bg-[linear-gradient(180deg,#002b33,rgba(0,43,51,.25)),linear-gradient(90deg,#008060_21.86%,#2bab60_78.13%)] bg-no-repeat bg-size-[100%_100%]"></div> */}
    </>
  );
}

export default GlobalHeader;
