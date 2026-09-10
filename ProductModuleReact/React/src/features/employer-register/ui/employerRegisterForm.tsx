import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employerRegiseterSchema,
  type employerRegisterRequest,
} from "../model";
import { employerRegister } from "../api";
import { formToJSON } from "axios";

interface employerRegisterFormProps {
  onSuccess: () => void
}
function EmployerRegisterForm({onSuccess}: employerRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<employerRegisterRequest>({
    resolver: zodResolver(employerRegiseterSchema),
    defaultValues: {
      tax_code: "",
      company_name: "",
      international_name:"",
      email: "",
      phone_number: "",
      director: "",
      headquarters_address: "",
      password: "",
      short_name:"",
      website:""
    },
  });
  const handle=()=>{console.log("click")}
  const onSubmit = async (data: employerRegisterRequest) => {
    try {
      const res = await employerRegister(data);
      // đá sang trang login
      if(res.message==="Đăng ký thành công"){
         onSuccess();
      }
     
    } catch (e) {
      console.log(e, "có lỗi khi đăng ký ");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        className="lg:grid-cols-2 gap-4 lg:w-200 lg:h-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Đăng ký thông tin công ty
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label>Mã số thuế</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.tax_code
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập mã số thuế"
              {...register("tax_code")}
            />
            {errors.tax_code && (
              <p className="text-xs text-red-500 mt-1">
                {errors.tax_code.message}
              </p>
            )}
          </div>
          <div>
            <label>Tên công ty</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.company_name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên công ty "
              {...register("company_name")}
            />
            {errors.company_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.company_name.message}
              </p>
            )}
          </div>
           <div>
            <label>Tên quốc tế công ty</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.international_name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên công ty "
              {...register("international_name")}
            />
            {errors.international_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.international_name.message}
              </p>
            )}
          </div>
          <div>
            <label>Tên rút gọn của công ty</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.short_name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên công ty "
              {...register("short_name")}
            />
            {errors.short_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.short_name.message}
              </p>
            )}
          </div>
           <div>
            <label>Website công ty</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.website
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên công ty "
              {...register("website")}
            />
            {errors.website && (
              <p className="text-xs text-red-500 mt-1">
                {errors.website.message}
              </p>
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
           <div>
            <label>Password</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên công ty "
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label>Số điện thoại </label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.phone_number
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập số điện thoại "
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div>
            <label>Giám đốc</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.director
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập tên giám đốc"
              {...register("director")}
            />
            {errors.director && (
              <p className="text-xs text-red-500 mt-1">
                {errors.director.message}
              </p>
            )}
          </div>
          <div>
            <label>Trụ sở chính</label>
            <input
              className={`w-full px-3 py-2 border rounded text-sm outline-none ${
                errors.headquarters_address
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
              placeholder="Nhập trụ sở chính"
              {...register("headquarters_address")}
            />
            {errors.headquarters_address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.headquarters_address.message}
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
      </form>
    </div>
  );
}
export default EmployerRegisterForm;