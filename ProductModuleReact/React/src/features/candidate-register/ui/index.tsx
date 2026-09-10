import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  candidateRegisterSchema,
  type candidateRegisterRequest,
} from "../model";
import { candidateRegister } from "../api";
import { setAccessToken } from "@/shared/lib/token";
import { setUserInfo } from "@/shared/lib/user";
interface candidateRegisterFormProps {
  onSuccess: () => void;
  onNavToEmployerRegisterPage:()=>void;
}
function CandidateRegisterForm({ onSuccess,onNavToEmployerRegisterPage }: candidateRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<candidateRegisterRequest>({
    resolver: zodResolver(candidateRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
    },
  });
  const onSubmit = async (data: candidateRegisterRequest) => {
    try {
      const res = await candidateRegister(data);
      if (res.access_token) {
        setAccessToken(res.access_token);
        setUserInfo(res.user)
        onSuccess();
      }
    } catch (e) {
      console.log("có lõi khi đăng ký ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        className="lg:grid-cols-2 gap-4 lg:w-200 lg:h-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Đăng ký tuyển dụng
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label>Email</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label>Họ và tên :</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.full_name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              {...register("full_name")}
            />
            {errors.full_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div>
            <label>Mật khẩu :</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              {...register("password")}
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
         <div className="mt-4"><button onClick={onNavToEmployerRegisterPage} className="font-medium hover:text-emerald-400">Đăng ký công ty</button></div>
      </form>
     
    </div>
  );
}
export default CandidateRegisterForm;