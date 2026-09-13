import { useNavigate ,useLocation} from "react-router";

import { useSession } from "@/entities/session";

function GlobalHeader() {
  const navigate = useNavigate();
  const location =useLocation();

  const { isAuthenticated, role } = useSession();
  const hanldeNavigateToRegister = () => {
    navigate("/dang-ky");
  };
  const hanldeNavigateToLogin = () => {
    navigate("/dang-nhap");
  };
  const handleNavigateToCompany = () => {
    navigate("/cong-ty");
  };
  const handleNavigateToCreateJob=()=>{
    navigate("/tao-job")
  }

  const handleNavigateToHomePage = () => {
    navigate("/");
  };
  
  return (
    <>
      <header className=" bg-white flex justify-between items-center p-2 text-sm">
        {/* Left header */}
        <div className="flex items-center gap-2 lg-gap-4">
          <img
            src="https://static.topcv.vn/v4/image/logo/topcv-logo-7.png"
            className="h-13 w-auto object-contain cursor-pointer"
            alt="TopCV Logo"
            onClick={handleNavigateToHomePage}
          />
          <ul className="flex gap-10">
            <li
              onClick={handleNavigateToCompany}
              className=" relative font-semibold  text-[14px] pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer"
            >
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
        <div className="flex gap-4 lg:gap-10 mr-20">
          {!isAuthenticated && (
            <>
              {" "}
              <button onClick={hanldeNavigateToRegister} className="px-4 py-2 text-emerald-400 font-bold border border-emerald-400  rounded-full hover:bg-gray-50  transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 pointer">
                Đăng ký
              </button>
              <button onClick={hanldeNavigateToLogin} className="px-4 py-2 text-white font-bold bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 pointer">
                Đăng nhập
              </button>
            </>
          )}

          {(role?.toLowerCase() === "admin" ||
            role?.toLowerCase() === "employer") && ( location.pathname!=="/tao-job"&&
            <button onClick={handleNavigateToCreateJob} className="px-4 py-2 text-emerald-400 font-bold border border-emerald-400  rounded-full hover:bg-gray-50 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 pointer">
              Đăng tin tuyển dụng
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default GlobalHeader;
