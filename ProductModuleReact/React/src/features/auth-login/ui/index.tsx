import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type loginRequest } from "../model";
import { login } from "../api";
import { setAccessToken } from "@/shared/lib/token";
import {setUserInfo} from "@/shared/lib/user"

interface loginFormProps {
  onSuccess: () => void;
  onNavToCandidateRegisterPage: () => void;
  onNavToEmployerRegisterPage: () => void;
}

function LoginForm({ onSuccess,onNavToCandidateRegisterPage,onNavToEmployerRegisterPage }: loginFormProps) {
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
        setUserInfo(res.user)
        onSuccess();
      }
    } catch (e) {
      console.log("Có lỗi khi đăng nhập ", e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        className="lg:grid-cols-2 gap-4 lg:w-200 lg:h-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        <div className="grid grid-cols-1  gap-4">
          <div>
            <label>Emai:</label>
            <input
              {...register("email")}
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập email"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label>Mật khẩu:</label>
            <input
              {...register("password")}
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập mật khẩu "
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded text-sm transition-colors disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi" : "Đăng ký"}
        </button>
        <div className="flex justify-between mx-1 my-2 text-emerald-600">
          <button onClick={onNavToCandidateRegisterPage} className="hover:text-emerald-400">Đăng ký</button>
          <button onClick={onNavToEmployerRegisterPage} className="hover:text-emerald-400">Đăng ký công ty</button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
