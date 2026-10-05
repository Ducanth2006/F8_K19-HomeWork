import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  candidateRegisterSchema,
  type candidateRegisterRequest,
} from "../model";
import { candidateRegister } from "../api";
import { setAccessToken } from "@/shared/lib/token";
import { setUserInfo } from "@/shared/lib/user";

interface CandidateRegisterFormProps {
  onSuccess: () => void;
  onNavToEmployerRegisterPage: () => void;
  onNavToLoginPage: () => void;
}

function CandidateRegisterForm({
  onSuccess,
  onNavToEmployerRegisterPage,
  onNavToLoginPage,
}: CandidateRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<candidateRegisterRequest>({
    resolver: zodResolver(candidateRegisterSchema),
    defaultValues: { email: "", password: "", full_name: "" },
  });

  const onSubmit = async (data: candidateRegisterRequest) => {
    try {
      const res = await candidateRegister(data);
      if (res.access_token) {
        setAccessToken(res.access_token);
        setUserInfo(res.user);
        onSuccess();
      }
    } catch (error) {
      console.error("Đăng ký thất bại", error);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${hasError ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"}`;

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[#f4f8f6] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-teal-100/80 blur-3xl" />
      <section className="relative w-full max-w-2xl rounded-[2rem] bg-white px-6 py-9 shadow-[0_24px_80px_-28px_rgba(15,70,54,0.28)] sm:px-10 sm:py-11">
        <a href="/" className="text-xl font-black tracking-tight text-emerald-800">TopCV<span className="text-emerald-500">.</span></a>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Tạo hồ sơ của bạn</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Đăng ký ứng viên</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Tạo tài khoản để khám phá những công việc phù hợp với bạn.</p>
        </div>

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:col-span-2">
            <label htmlFor="candidate-name" className="mb-2 block text-sm font-semibold text-slate-700">Họ và tên</label>
            <input id="candidate-name" autoComplete="name" placeholder="Nguyễn Văn An" {...register("full_name")} className={inputClass(!!errors.full_name)} />
            {errors.full_name && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.full_name.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="candidate-email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input id="candidate-email" type="email" autoComplete="email" placeholder="ban@example.com" {...register("email")} className={inputClass(!!errors.email)} />
            {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.email.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="candidate-password" className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu</label>
            <input id="candidate-password" type="password" autoComplete="new-password" placeholder="Tối thiểu 8 ký tự" {...register("password")} className={inputClass(!!errors.password)} />
            {errors.password && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="mt-1 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
            {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="mt-7 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">Đã có tài khoản? <button type="button" onClick={onNavToLoginPage} className="font-semibold text-emerald-700 hover:text-emerald-900">Đăng nhập</button></p>
          <button type="button" onClick={onNavToEmployerRegisterPage} className="mt-3 text-sm font-semibold text-slate-500 transition hover:text-emerald-700">Bạn là nhà tuyển dụng? Đăng ký công ty</button>
        </div>
      </section>
    </main>
  );
}

export default CandidateRegisterForm;
