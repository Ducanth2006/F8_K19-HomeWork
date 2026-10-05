import { useForm, useFieldArray } from "react-hook-form";
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
import { RichTextTab } from "../rich-text-tab";

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
      specialty:"",
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
      work_location: [{ city_id: 0, city_name: "", address_detail: "" }],
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
    console.log("nhận hàm")
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
    if (Array.isArray(res?.categories)) setCategories(res.categories);
  };

  const isNegotiable = watch("salary.is_negotiable");
  // Init useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_location",
  });

  return (
    <form
      className="max-w-6xl mx-auto my-8 p-6 md:p-10 bg-white rounded-2xl  border border-gray-100 space-y-8"
      onSubmit={handleSubmit(onSubmit,(errors)=> console.log("Lỗi là ",errors))}
    >
      <div className="border-b border-gray-100 pb-5 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Đăng tuyển job mới
        </h2>
        <p className="text-sm text-gray-500 mt-1">Điền đầy đủ thông tin để tạo bài tuyển dụng mới</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tiêu đề công việc <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Ví dụ: Lập trình viên ReactJS Senior..."
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition duration-150 outline-none ${
              errors.title
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1 font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* Category groups */}
        <div className="md:col-span-1 lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ngành nghề chính:</label>
          <select
           
            onChange={handleClickCateGroup}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
          >
            <option value="">-- Chọn ngành nghề --</option>
            {categoriesGroup?.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.group_name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="md:col-span-1 lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chi tiết nghề</label>
          <select
            {...register("category")}
            value={watch("category")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
          >
            <option value="">-- Chọn chi tiết nghề --</option>
            {categories?.map((cate) => (
              <option key={cate.id} value={cate.name}>
                {cate.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.category.message}
            </p>
          )}
        </div>
        {/* Specialty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chuyên môn</label>
          <input
            placeholder="Nhập chuyên môn"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition duration-150 outline-none ${
              errors.specialty
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
            {...register("specialty")}
          />
          {errors.specialty && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.specialty.message}
            </p>
          )}
        </div>


        {/* Job type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hình thức làm việc</label>
          <select
            {...register("job_type")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
          >
            {JOB_TYPES.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
          {errors.job_type && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.job_type.message}
            </p>
          )}
        </div>

        {/* Experience level*/}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Yêu cầu kinh nghiệm</label>
          <input
            placeholder="Ví dụ: 2 năm, Không yêu cầu..."
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition duration-150 outline-none ${
              errors.experience_level
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
            {...register("experience_level")}
          />
          {errors.experience_level && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.experience_level.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Giới tính</label>
          <select
            {...register("gender")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500 mt-1 font-medium">{errors.gender.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số lượng cần tuyển</label>
          <input
            placeholder="Số lượng"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition duration-150 outline-none ${
              errors.quantity
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hạn tuyển </label>
          <input
            type="date"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm transition duration-150 outline-none ${
              errors.deadline
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
            {...register("deadline")}
          />
          {errors.deadline && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* is hot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Có hot không ?</label>
          <select
            defaultValue="false"
            {...register("is_hot")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {errors.is_hot && (
            <p className="text-xs text-red-500 mt-1 font-medium">{errors.is_hot.message}</p>
          )}
        </div>

        {/* Salary */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Mức lương</h3>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600"
                type="checkbox"
                checked={Boolean(isNegotiable)}
                onChange={(e) => {
                  setValue("salary.is_negotiable", e.target.checked);
                  if (e.target.checked) {
                    setValue("salary.type", null);
                    setValue("salary.min", null);
                    setValue("salary.max", null);
                  }
                }}
              />
              Lương thỏa thuận
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Salary type */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Thể loại lương</label>
              <select
                disabled={isNegotiable}
                {...register("salary.type")}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white transition ${
                  isNegotiable ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "focus:border-emerald-500"
                }`}
              >
                {!isNegotiable &&
                  SALARY_TYPES.map((salaryType) => (
                    <option key={salaryType} value={salaryType}>
                      {salaryType}
                    </option>
                  ))}
              </select>
              {errors.salary?.type && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.salary.type.message}
                </p>
              )}
            </div>

            {/* Salary min */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Lương tối thiểu </label>
              <input
                disabled={isNegotiable}
                placeholder="Lương min"
                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none bg-white transition ${
                  isNegotiable ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                } ${
                  errors.salary?.min
                    ? "border-red-500 focus:ring-1 focus:ring-red-200"
                    : "border-gray-300 focus:border-emerald-500"
                }`}
                {...register("salary.min")}
              />
              {errors.salary?.min && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.salary?.min.message}
                </p>
              )}
            </div>

            {/* Salary max */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Lương tối đa </label>
              <input
                disabled={isNegotiable}
                placeholder="Lương max"
                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none bg-white transition ${
                  isNegotiable ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                } ${
                  errors.salary?.max
                    ? "border-red-500 focus:ring-1 focus:ring-red-200"
                    : "border-gray-300 focus:border-emerald-500"
                }`}
                {...register("salary.max")}
              />
              {errors.salary?.max && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.salary?.max.message}
                </p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Đơn vị tiền tệ </label>
              <input
                defaultValue={"VND"}
                disabled={isNegotiable}
                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none bg-white transition ${
                  isNegotiable ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                } ${
                  errors.salary?.currency
                    ? "border-red-500 focus:ring-1 focus:ring-red-200"
                    : "border-gray-300 focus:border-emerald-500"
                }`}
                {...register("salary.currency")}
              />
              {errors.salary?.currency && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.salary?.currency.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Work location  */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-800">Địa điểm làm việc</label>
            <button
              type="button"
              onClick={() =>
                append({ city_id: 0, city_name: "", address_detail: "" })
              }
              className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition cursor-pointer"
            >
              + Thêm địa chỉ mới
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      placeholder="ID thành phố (ví dụ: 1)"
                      {...register(`work_location.${index}.city_id`)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      placeholder="Tên thành phố (ví dụ: Hà Nội)"
                      {...register(`work_location.${index}.city_name`)}
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex gap-3 items-center">
                    <input
                      placeholder="Chi tiết địa chỉ (ví dụ: Tầng 5, Tòa nhà A...)"
                      {...register(`work_location.${index}.address_detail`)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      disabled={fields.length === 1}
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition border border-red-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Richt tabs */}
        <RichTextTab control={control} errors={errors}/>
      

        <div className="col-span-1 md:col-span-2 lg:col-span-4 pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng tuyển ngay"}
          </button>
        </div>
      </div>
    </form>
  );
}
export default JobCreateForm;

