import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { getCompanies,CompanyCard  } from "@/entities/company";
import type { ICompanyCard } from "@/entities/company";
function Company() {
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<ICompanyCard[]>([]);
  const Navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getCompanies();
      if (data) {
        setCompanies(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleClick = (id: string) => {
    Navigate(`/cong-ty/${id}`);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="w-full h-78   bg-linear-to-t from-[#f7fefa] to-green-100">
          <div className="flex  h-full justify-between  container mx-auto px-3 sm:px-25 pt-5 lg:px-50 ">
            {/* left */}
            <div className="w-118 ">
              <div className="flex gap-5 text-sm">
                <button className="active:border-b pb-2  cursor-pointer font-sans atcive:font-semibold">
                  Danh sách công ty
                </button>
                <button className="active:border-b pb-2  cursor-pointer font-sans atcive:font-semibold">
                  Top công ty
                </button>
              </div>
              <p className="text-lg font-semibold text-green-500">
                Khám phá 100.000+ công ty nổi bật
              </p>
              <p className="text-sm pt-5">
                Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành
                cho bạn
              </p>
              <form className="flex items-center bg-white rounded-full p-1.5 shadow-xl max-w-lg w-full mt-10 text-sm">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Nhập tên công ty"
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm ml-3"
                />

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2 py-1 rounded-full transition-colors whitespace-nowrap"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
            {/* right */}
            <div className="h-full pb-2 hidden lg:flex">
              <img
                className="object-cover h-full"
                src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="w-full mb-5">
          <div className=" container mx-auto px-3 sm:px-25  lg:px-50">
            <h1 className="w-full text-center font-bold text-xl py-5">
              DANH SÁCH CÁC CÔNG TY NỔI BẬT
            </h1>
            <div className="w-full grid  grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
              {companies.map((c,i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleClick(c.id)}
                    className="col-span-1"
                  >
                    <CompanyCard
                      id={c.id}
                      short_name={c.short_name}
                      card_media={c.card_media}
                      logo_url={c.logo_url}
                      short_description={c.short_description}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Company;
