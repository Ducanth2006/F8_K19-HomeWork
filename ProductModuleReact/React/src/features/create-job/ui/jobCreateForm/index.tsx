import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { type ChangeEvent } from "react";

import {
  GENDERS,
  JOB_TYPES,
  jobCreateSchema,
  SALARY_TYPES,
  type JobCreateFormOutput,
  type JobCreateFormInput,
} from "../../model/index";
import { type Job } from "@/entities/job/model/createJobTypes";
import { createJob } from "../../api";
import {
  getCategoryGroup,
  type ICatiegoryGroup,
  type ICategories,
} from "@/entities/category";
import { boolean } from "zod";
interface JobCreateFormProps {
  onSuccess: (data: Job) => void;
}
function JobCreateForm({ onSuccess }: JobCreateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JobCreateFormInput, any, JobCreateFormOutput>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      category: "",
      job_type: "FULL_TIME",
      gender: "NOT_REQUIRED",
      deadline: "",
      description_html: "",
      requirements_html: "",
      benefits_html: "",
      salary: {
        min: null,
        max: null,
        currency: "VND",
        is_negotiable: false,
      },
      work_location: [{ city_id: null, city_name: "", address_detail: "" }],
    },
  });
  const [categoriesGroup, setCategoriesGroup] = useState<ICatiegoryGroup[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  useEffect(() => {
    const fetchCategoryGroup = async () => {
      try {
        const res = await getCategoryGroup();
        if (res) {
          setCategoriesGroup(res);
        }
      } catch (e) {
        console.log("Fetch categories bị lỗi :", e);
      }
    };
    fetchCategoryGroup();
  }, []);
  const onSubmit = async (data: JobCreateFormOutput) => {
    try {
      const res = await createJob(data);
      onSuccess(res);
      console.log("Tạo thành công");
    } catch (e) {
      console.log(e, "  có lỗi khi tạo job ");
    }
  };
  const handleClickCateGroup = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    // do onChange ghi đè onChange của use hook form nên ta phải dùng setValue đồng kiểm tra luôn , bỏ register luôn
    setValue("category", id === "" ? "" : id, { shouldValidate: true });
    setValue("specialty", "");
    if (!id) {
      setCategories([]);
      return;
    }
    const res = categoriesGroup.find((cate) => cate.id === id);
    console.log(id);
    if (Array.isArray(res?.categories)) setCategories(res.categories);
  };
  const isNegotiable = watch("salary.is_negotiable");

  return (
    <form
      className="w-full p-6 bg-white  shadow-sm items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        Đăng tuyển job mới
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10 items-center justify-between">
        <div>
          <label>Tiêu đề công việc</label>
          <input
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${
              errors.title
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
        {/* CategoriesGroup */}
        <div>
          <label className="block">Ngành nghề chính:</label>
          <select
            {...register("category")}
            onChange={handleClickCateGroup}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none "
          >
            <option value="">-- Chọn ngành nghề --</option>
            {categoriesGroup?.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.group_name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        {/* Category */}
        <div>
          <label className="block">Chi tiết nghề</label>
          <select
            value={watch("category")}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none "
          >
            <option value="">-- Chọn chi tiết nghề --</option>
            {categories?.map((cate) => (
              <option key={cate.id} value={cate.name}>
                {cate.name}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <p className="text-xs text-red-500 mt-1">
              {errors.specialty.message}
            </p>
          )}
        </div>
        {/* Job type */}
        <div>
          <label className="block">Thể loại công viêc</label>
          <select
            {...register("job_type")}
            className="w-full px-3 py-2 border-gray-300 border rounded text-sm outline-none "
          >
            {JOB_TYPES.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
          {errors.job_type && (
            <p className="text-xs text-red-500 mt-1">
              {errors.job_type.message}
            </p>
          )}
        </div>
        {/* Experience level*/}
        <div>
          <label>Yêu cầu kinh nghiệm</label>
          <input
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${
              errors.experience_level
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("experience_level")}
          />
          {errors.experience_level && (
            <p className="text-xs text-red-500 mt-1">
              {errors.experience_level.message}
            </p>
          )}
        </div>
        {/* Gender */}
        <div>
          <label className="block">Giới tính</label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none "
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>
        {/* Quantity */}
        <div>
          <label>Số lượng cần tuyển</label>
          <input
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${
              errors.quantity
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="text-xs text-red-500 mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
        {/* Date */}
        <div>
          <label>Hạn tuyển </label>
          <input
            type="date"
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${
              errors.deadline
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("deadline")}
          />
          {errors.deadline && (
            <p className="text-xs text-red-500 mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>
        {/* is hot */}
        <div>
          <label className="block">Có hot không ?</label>
          <select
            defaultValue="false"
            {...register("is_hot")}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none "
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.is_hot && (
            <p className="text-xs text-red-500 mt-1">{errors.is_hot.message}</p>
          )}
        </div>
        {/* Salary */}
        <div>
          <label className="block">Mức lương</label>
          <label>
            <input
            className="w-4 h-4 text-emerald-600 rounded"
              type="checkbox"
              checked={Boolean(isNegotiable)}
              onChange={(e) => {
                setValue("salary.is_negotiable", e.target.checked);
                if (e.target.checked) {
                  setValue("salary.type", null);
                  setValue("salary.min", null);
                }
              }}
              
            />
            Thỏa thuận
          </label>
        </div>
        {/* Salary type */}
          <div>
          <label className="block">Thể loại lương</label>
          <select
            disabled={isNegotiable}
            {...register("salary.type")}
            className={`w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none ${isNegotiable?"bg-gray-200":""}`}
          >
            {!isNegotiable&&SALARY_TYPES.map((salaryType) => (
              <option key={salaryType} value={salaryType}>
                {salaryType}
              </option>
            ))}
          </select>
          {errors.salary?.type && (
            <p className="text-xs text-red-500 mt-1">{errors.salary.type.message}</p>
          )}
        </div>
        {/* Salary min */}
        <div>
          <label>Lương tối thiểu </label>
          <input
            disabled={isNegotiable}
      
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${isNegotiable?"bg-gray-200":""}  ${
              errors.salary?.min
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("salary.min")}
          />
          {errors.salary?.min && (
            <p className="text-xs text-red-500 mt-1">
              {errors.salary?.min.message}
            </p>
          )}
        </div>
        {/* Salary max */}
        <div>
          <label>Lương tối đa </label>
          <input
            disabled={isNegotiable}
      
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${isNegotiable?"bg-gray-200":""}  ${
              errors.salary?.max
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("salary.max")}
          />
          {errors.salary?.max && (
            <p className="text-xs text-red-500 mt-1">
              {errors.salary?.max.message}
            </p>
          )}
        </div>
        {/* Currency */}
        <div>
          <label>Đơn vị tiền tệ </label>
          <input
            defaultValue={"VND"}
            disabled={isNegotiable}
      
            className={`w-full px-3 py-2 border rounded text-sm outline-none ${isNegotiable?"bg-gray-200":""}  ${
              errors.salary?.currency
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            {...register("salary.currency")}
          />
          {errors.salary?.currency && (
            <p className="text-xs text-red-500 mt-1">
              {errors.salary?.currency.message}
            </p>
          )}
        </div>
        


      </div>
    </form>
  );
}
export default JobCreateForm;
