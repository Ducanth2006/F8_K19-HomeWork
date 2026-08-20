import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router";
import DOMPurify from "dompurify";

import {getCompanies,getCompaniesById} from "@/entities/company"
import {getJobByCompanyId } from "@/entities/job";
import type { IJobCard } from "@/entities/job";
import type{ICompanyDetail} from "@/entities/company"
import {CompanyJobCard} from "@/entities/job";


interface CommonInfoItem {
  name: string;
  icon: string;
  props: keyof ICompanyDetail; // ✨ Giúp TypeScript hiểu props là key hợp lệ
}
const commonInfo: CommonInfoItem[] = [
  { name: "Mã số thuế", icon: "fa-solid fa-key", props: "tax_code" },
  { name: "Quy mô nhân sự", icon: "fa-solid fa-users", props: "company_size" },
  { name: "Giám đốc", icon: "fa-solid fa-user-tie", props: "director" },
  { name: "Số điện thoại", icon: "fa-solid fa-phone", props: "phone_number" },
];
function CompanyDetail() {
  const [jobs, setJobs] = useState<IJobCard[]>([])
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await getCompaniesById(id);
      setCompanyDetail(data);
    };
    const getJobs = async () => {
      const data = await getJobByCompanyId(id);
      setJobs(data);
    }
    fetchData();
    getJobs();
  }, [id]);
  const cleanHtml = DOMPurify.sanitize(
    companyDetail?.description_html as string,
  );
  const handleClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-4 text-xs sm:text-sm text-slate-500 font-medium overflow-x-auto">
          <NavLink
            to="/"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Trang chủ
          </NavLink>
          <span className="text-slate-300">/</span>
          <NavLink
            to="/cong-ty"
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Công ty
          </NavLink>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold truncate">
            {companyDetail?.company_name || "Chi tiết công ty"}
          </span>
        </div>

        {/* Company Header Banner Card */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 gap-6">
          <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-slate-100 bg-slate-50 p-2 shrink-0 flex items-center justify-center shadow-xs overflow-hidden">
              <img
                className="w-full h-full object-contain rounded-xl"
                src={companyDetail?.logo_url}
                alt={companyDetail?.company_name}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
                {companyDetail?.company_name}
              </h1>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500 font-medium mt-3">
                {companyDetail?.website && (
                  <a
                    href={companyDetail?.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                  >
                    <i className="fa-solid fa-globe text-emerald-600"></i>
                    <span>{companyDetail.website}</span>
                  </a>
                )}
                {companyDetail?.email && (
                  <div className="flex items-center gap-1.5">
                    <i className="fa-solid fa-envelope text-emerald-600"></i>
                    <span>{companyDetail.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer w-full md:w-auto">
            <i className="fa-solid fa-plus text-sm"></i>
            <span>Theo dõi</span>
          </button>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Introduction & Jobs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Introduction Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-building text-emerald-600"></i>
                Giới thiệu công ty
              </h2>
              <div
                className={`relative transition-all duration-300 ease-out ${
                  isExpanded ? "" : "max-h-96 overflow-hidden"
                }`}
              >
                <div
                  className="prose max-w-none text-slate-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                ></div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>
              <div className="text-center pt-4 mt-2">
                <button
                  onClick={handleClick}
                  className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm cursor-pointer py-1 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100/70 transition-all"
                >
                  <span>{isExpanded ? "Thu gọn" : "Xem thêm"}</span>
                  <i className={`fa-solid ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"} text-xs`}></i>
                </button>
              </div>
            </div>

            {/* Job list by company */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-briefcase text-emerald-600"></i>
                  Tin tuyển dụng
                </span>
                <span className="text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                  {jobs.length} công việc
                </span>
              </h3>
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Công ty hiện chưa có tin tuyển dụng nào khác.
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {jobs.map((j) => (
                    <li key={j.id}>
                      <CompanyJobCard {...j} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Common Information Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs sticky top-4">
            <h2 className="text-lg font-bold text-slate-800 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-emerald-600"></i>
              Thông tin chung
            </h2>
            <ul className="flex flex-col gap-5">
              {commonInfo.map((i) => {
                const value = companyDetail?.[i.props];
                return (
                  <li key={i.name} className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <i className={`${i.icon} text-base`}></i>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">{i.name}</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">
                        {(value as React.ReactNode) || "Đang cập nhật"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompanyDetail;
