import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employerRegiseterSchema,
  type employerRegisterRequest,
} from "../model";
import { employerRegister } from "../api";

interface EmployerRegisterFormProps {
  onSuccess: () => void;
  onNavToLoginPage: () => void;
}

function EmployerRegisterForm({ onSuccess, onNavToLoginPage }: EmployerRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<employerRegisterRequest>({
    resolver: zodResolver(employerRegiseterSchema),
    defaultValues: {
      tax_code: "",
      company_name: "",
      international_name: "",
      email: "",
      phone_number: "",
      director: "",
      headquarters_address: "",
      password: "",
      short_name: "",
      website: "",
    },
  });

  const onSubmit = async (data: employerRegisterRequest) => {
    try {
      const res = await employerRegister(data);
      if (res.message === "Đăng ký thành công") onSuccess();
    } catch (error) {
      console.error("Đăng ký công ty thất bại", error);
    }
  };

  const fields = [
    { name: "company_name", label: "Tên công ty", placeholder: "Công ty của bạn", required: true },
    { name: "short_name", label: "Tên viết tắt", placeholder: "Tên công ty thường dùng" },
    { name: "international_name", label: "Tên quốc tế", placeholder: "Company name" },
    { name: "tax_code", label: "Mã số thuế", placeholder: "Nhập mã số thuế", required: true },
    { name: "director", label: "Người đại diện", placeholder: "Họ và tên người đại diện" },
    { name: "headquarters_address", label: "Địa chỉ trụ sở", placeholder: "Số nhà, đường, quận, thành phố" },
    { name: "email", label: "Email công việc", placeholder: "hr@congty.vn", required: true, type: "email" },
    { name: "phone_number", label: "Số điện thoại", placeholder: "Nhập số điện thoại", required: true, type: "tel" },
    { name: "website", label: "Website", placeholder: "https://congty.vn" },
    { name: "password", label: "Mật khẩu", placeholder: "Tối thiểu 8 ký tự", required: true, type: "password" },
  ] as const;

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[#f4f8f6] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-teal-100/80 blur-3xl" />
      <section className="relative w-full max-w-4xl rounded-[2rem] bg-white px-6 py-9 shadow-[0_24px_80px_-28px_rgba(15,70,54,0.28)] sm:px-10 sm:py-11">
        <a href="/" className="text-xl font-black tracking-tight text-emerald-800">TopCV<span className="text-emerald-500">.</span></a>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Dành cho nhà tuyển dụng</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Tạo tài khoản công ty</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Hoàn thành thông tin để bắt đầu tìm kiếm ứng viên phù hợp.</p>
        </div>

        <form className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => {
            const error = errors[field.name as keyof typeof errors];
            return (
              <div key={field.name}>
                <label htmlFor={`employer-${field.name}`} className="mb-2 block text-sm font-semibold text-slate-700">{field.label}{"required" in field && field.required && <span className="ml-1 text-rose-500">*</span>}</label>
                <input
                  id={`employer-${field.name}`}
                  type={"type" in field ? field.type : "text"}
                  autoComplete={field.name === "email" ? "email" : field.name === "password" ? "new-password" : "off"}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"}`}
                />
                {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error.message?.toString()}</p>}
              </div>
            );
          })}
          <button type="submit" disabled={isSubmitting} className="mt-2 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
            {isSubmitting ? "Đang gửi thông tin..." : "Đăng ký công ty"}
          </button>
        </form>

        <div className="mt-7 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">Đã có tài khoản? <button type="button" onClick={onNavToLoginPage} className="font-semibold text-emerald-700 hover:text-emerald-900">Đăng nhập</button></p>
        </div>
      </section>
    </main>
  );
}

export default EmployerRegisterForm;
