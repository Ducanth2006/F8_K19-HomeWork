import { useParams, NavLink, useNavigate } from "react-router";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

import { useJobDetail } from "@/entities/job";
import { useSession } from "@/entities/session";
import HeaderJobDetail from "./ui/headerJobDetail";
import SumCompany from "./ui/sumCompany";
import JobCommonInfo from "./ui/commonInfo";
function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSession();
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
  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/dang-nhap");
      return;
    }
    if (role?.toLowerCase() !== "candidate") {
      toast.info("Chỉ tài khoản ứng viên mới có thể ứng tuyển công việc.");
      return;
    }
    if (!email) {
      toast.error("Tin tuyển dụng chưa có email liên hệ.");
      return;
    }
    const subject = encodeURIComponent(`Ứng tuyển vị trí ${job?.title ?? ""}`);
    const body = encodeURIComponent(`Xin chào ${short_name ?? "nhà tuyển dụng"},\n\nTôi muốn ứng tuyển vị trí ${job?.title ?? ""}.\n\nTrân trọng,\n${job?.company?.short_name ?? "Ứng viên"}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
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
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800">Bạn phù hợp với công việc này?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Gửi thông tin ứng tuyển trực tiếp đến nhà tuyển dụng.</p>
              <button
                type="button"
                onClick={handleApply}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <i className="fa-solid fa-paper-plane" />
                Ứng tuyển ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobDetail;
