import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { getCompanies, CompanyCard } from "@/entities/company";
import type { ICompanyCard } from "@/entities/company";

function Company() {
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<ICompanyCard[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "top">("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredCompanies = companies.filter((c) =>
    c.short_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Header / Hero Section */}
      <div className="w-full bg-gradient-to-b from-emerald-50/90 via-emerald-50/40 to-slate-50 border-b border-emerald-100/60 py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20 flex justify-between items-center gap-8">
          {/* Left Hero Content */}
          <div className="max-w-xl w-full">
            {/* Tabs */}
            <div className="flex gap-2 text-sm mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${activeTab === "all"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-emerald-600 border border-slate-200/80"
                  }`}
              >
                Danh sách công ty
              </button>
              <button
                onClick={() => setActiveTab("top")}
                className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${activeTab === "top"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-emerald-600 border border-slate-200/80"
                  }`}
              >
                Top công ty
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
              Khám phá 100.000+ công ty nổi bật
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn
            </p>

            {/* Search Bar */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-white rounded-full p-2 shadow-lg shadow-emerald-900/5 border border-emerald-100/80 max-w-lg w-full mt-8 text-sm focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
            >
              <i className="fa-solid fa-magnifying-glass text-emerald-600 text-base ml-4 mr-2"></i>
              <input
                type="text"
                placeholder="Nhập tên công ty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm py-1"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-full transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Right Hero Image */}
          <div className="hidden lg:flex shrink-0 max-w-md">
            <img
              className="object-contain h-64 drop-shadow-md"
              src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
              alt="TopCV Companies"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-slate-800 tracking-tight">
              DANH SÁCH CÁC CÔNG TY NỔI BẬT
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hiển thị {filteredCompanies.length} công ty hàng đầu
            </p>
          </div>
        </div>

        {/* Company Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="w-full h-80 rounded-2xl bg-white border border-slate-100 p-4 animate-pulse">
                <div className="w-full h-40 bg-slate-200 rounded-xl mb-4" />
                <div className="w-3/4 h-5 bg-slate-200 rounded mb-2" />
                <div className="w-full h-4 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8">
            <i className="fa-solid fa-building-circle-xmark text-4xl text-slate-300 mb-3 block"></i>
            <p className="text-slate-600 font-medium">Không tìm thấy công ty nào phù hợp</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs font-semibold text-emerald-600 hover:underline"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((c, i) => (
              <div
                key={c.id || i}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Company;
