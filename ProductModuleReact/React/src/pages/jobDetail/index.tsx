import { useParams, NavLink } from "react-router";
import DOMPurify from "dompurify";

import { useJobDetail } from "@/entities/job";
import HeaderJobDetail from "./ui/headerJobDetail";
import SumCompany from "./ui/sumCompany";
import JobCommonInfo from "./ui/commonInfo";
function JobDetail() {
  const { slug } = useParams();
  if (!slug) return <div>Không có trang này nhé</div>;
  const { job, isLoading, hasError, refetch } = useJobDetail(slug);
  // cho header
  // cho short summary company
  const {
    id: companyId,
    category: companyCate,
    short_name,
    email,
    company_size,
    logo_url,
    company_name,
  } = job?.company || {};
  // cho thông tin chung
  const { job_type, quantity, gender } = job || {};
  const cleanDescHtml = DOMPurify.sanitize(job?.description_html as string);
  const cleanBenefitHtml = DOMPurify.sanitize(job?.benefits_html as string);
  const cleanRequireHtml =DOMPurify.sanitize(job?.requirements_html as string)
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
            to={`/cong-ty/${companyId}`}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            {short_name}
          </NavLink>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold truncate">
            {job?.title || "Chi tiết công ty"}
          </span>
        </div>
        {/* Header  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <HeaderJobDetail {...job} />
            <div
              className=" prose prose-slate max-w-none bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs"
              dangerouslySetInnerHTML={{ __html: cleanDescHtml }}
            ></div>
            <div className=" prose prose-slate max-w-none bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs" dangerouslySetInnerHTML={{ __html: cleanBenefitHtml }}></div>
            <div className=" prose prose-slate max-w-none bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs" dangerouslySetInnerHTML={{ __html: cleanRequireHtml }}></div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-5">
            <SumCompany
              id={companyId}
              cate={companyCate}
              shortName={short_name}
              email={email}
              logo={logo_url}
              companySize={company_size}
              companyName={company_name}
            />
            <JobCommonInfo
              jobType={job_type}
              quantity={quantity}
              gender={gender}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobDetail;
