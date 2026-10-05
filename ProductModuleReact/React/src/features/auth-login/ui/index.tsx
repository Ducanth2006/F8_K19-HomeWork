import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type loginRequest } from "../model";
import { login } from "../api";
import { setAccessToken } from "@/shared/lib/token";
import { setUserInfo } from "@/shared/lib/user";

interface LoginFormProps {
  onSuccess: () => void;
  onNavToCandidateRegisterPage: () => void;
  onNavToEmployerRegisterPage: () => void;
}

function LoginForm({
  onSuccess,
  onNavToCandidateRegisterPage,
  onNavToEmployerRegisterPage,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: loginRequest) => {
    try {
      const res = await login(data);
      if (res.access_token) {
        setAccessToken(res.access_token);
        setUserInfo(res.user);
        onSuccess();
      }
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[#f4f8f6] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-teal-100/80 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_-28px_rgba(15,70,54,0.28)] md:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-950 p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full border-[36px] border-white/5" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[44px] border-emerald-300/10" />
          <a href="/" className="relative text-2xl font-black tracking-tight">TopCV<span className="text-emerald-300">.</span></a>
          <div className="relative my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              CƠ HỘI MỚI ĐANG CHỜ BẠN
            </div>
            <h1 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">Bắt đầu hành trình sự nghiệp của bạn</h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-emerald-100/80">Kết nối với công việc phù hợp và những nhà tuyển dụng hàng đầu.</p>
          </div>
          <p className="relative text-sm text-emerald-100/60">Tìm việc tốt. Chọn tương lai.</p>
        </section>

        <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto max-w-md">
            <div className="mb-8 md:hidden">
              <a href="/" className="text-2xl font-black tracking-tight text-emerald-800">TopCV<span className="text-emerald-500">.</span></a>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Chào mừng trở lại</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Đăng nhập</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Nhập thông tin tài khoản để tiếp tục.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="ban@example.com"
                  {...register("email")}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${errors.email ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"}`}
                />
                {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${errors.password ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"}`}
                />
                {errors.password && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.password.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">Bạn chưa có tài khoản?</p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
                <button type="button" onClick={onNavToCandidateRegisterPage} className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">Đăng ký ứng viên</button>
                <span className="text-slate-200">|</span>
                <button type="button" onClick={onNavToEmployerRegisterPage} className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">Đăng ký nhà tuyển dụng</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginForm;
