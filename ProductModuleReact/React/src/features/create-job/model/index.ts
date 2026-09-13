import { z } from "zod";

// Hàm helper loại bỏ toàn bộ thẻ HTML và khoảng trắng thừa
const isNonEmptyHtml = (val?: string | null) => {
  if (!val) return false;
  const textOnly = val
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, "")
    .trim();
  return textOnly.length > 0;
};
// helper giúp ép kiểu bỏ trống  thành null để tránh lỗi
const transformOptionalNumber = (val: unknown) => {
  if (val === "" || val === undefined || val === null) return null;
  const parsed = Number(val);
  return isNaN(parsed) ? null : parsed;
};
export const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "INTERNSHIP",
] as const;
export const GENDERS = ["MALE", "FEMALE", "NOT_REQUIRED"] as const;
// as const để cố định không cho push hay pop j hết 
export const SALARY_TYPES=["RANGE","AGREEMENT","UP_TO","MINIMUM"] as const; 

export const jobCreateSchema = z.object({
  title: z.string().min(5, "Tiêu đề công việc phải có ít nhất 5 ký tự"),

  category: z.string().min(1, "Vui lòng chọn ngành nghề"),

  specialty: z.string().optional().transform((value)=>value?value:null),
  // .enum để dùng cho enum
  job_type:z.enum(JOB_TYPES,"Vui lòng chọn hình thức làm việc"),

  gender: z.enum(GENDERS).nullable().optional(),

  experience_level: z.string().nullable().optional(),

  quantity: z
    .union([z.number(), z.string()])
    .optional()
    .nullable()
    .transform((val) => (val ? Number(val) : null)),

  deadline: z.string().min(1, "Vui lòng chọn hạn nộp hồ sơ"),

  is_hot: z.coerce.boolean().default(false).optional(),
  description_html: z.string().refine(isNonEmptyHtml, {
    message: "Mô tả công việc không được để trống",
  }),
  requirements_html: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (isNonEmptyHtml(val) ? val : null)),

  benefits_html: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (isNonEmptyHtml(val) ? val : null)),
  salary: z
    .object({
      type: z.enum(SALARY_TYPES).nullable().optional(),
      min: z.preprocess(
        transformOptionalNumber,
        z.number().nullable().optional(),
      ),
      max: z.preprocess(
        transformOptionalNumber,
        z.number().nullable().optional(),
      ),
      currency: z.string().default("VND"),
      is_negotiable: z.boolean().default(false).optional(),
    })
    .nullable()
    .optional(),
  work_location: z.array(
    z.object({
      city_name: z.string().nullable().optional(),
      city_id: z.coerce.number().nullable().optional(),
      address_detail: z.string().nullable().optional(),
    }),
  ).optional(),
});
//Nguyên nhân chính gây ra lỗi là  dùng .transform(...) và z.preprocess(...) nó sẽ bị tách ra thành 2 trường hợp 
export type JobCreateFormInput = z.input<typeof jobCreateSchema>;
export type JobCreateFormOutput = z.infer<typeof jobCreateSchema>;
