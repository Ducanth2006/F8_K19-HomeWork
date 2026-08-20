import type { ICompanyCard, Company } from "@/entities/company";
import type { Address } from "@/shared/types/location";

export interface IJobCard {
  id: string;
  title: string;
  slug: string;
  category: string;
  job_type: string;
  experience_level: string;
  gender: string;
  quantity: string;
  salary: ISalary;
  deadline: string;
  status: string;
  is_hot: boolean;
  description_html: string;
  requirements_html: string;
  benefits_html: string;
  company: ICompanyCard;
}
export interface ISalary {
  min: number;
  max: number;
  currency: string;
  is_negotiable: boolean;
}
//JobCardHomePageDatas thực chất là một tập con (subset) thông tin cắt ra từ IJobCard.
export interface JobCardHomePageDatas extends Pick<
  IJobCard,
  "id" | "slug" | "job_type" | "title" | "salary"
> {
  company: Pick<ICompanyCard, "id" | "logo_url" | "short_name">;
}
export interface JobCardHomePageProps {
  job: JobCardHomePageDatas;
  onSelectJob?: (id: string) => void;
}
export interface JobDetailPage extends Pick<
  Job,
  | "id"
  | "company"
  | "title"
  | "job_type"
  | "experience_level"
  | "gender"
  | "quantity"
  | "salary"
  | "work_location"
  | "deadline"
  | "description_html"
  | "requirements_html"
  | "benefits_html"
> {}
export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | string;
export type GenderRequirement = "NOT_REQUIRED" | "MALE" | "FEMALE";
export type SalaryType = "RANGE" | "EXACT" | "NEGOTIABLE" | string;
export type JobStatus = "PUBLISHED" | "DRAFT" | "CLOSED" | string;
export type ExperienceLevel =
  | "Chưa có kinh nghiệm"
  | "1 năm trở xuống"
  | "1 năm"
  | "2 năm"
  | "3 năm"
  | "Từ 4-5 năm"
  | "Trên 5 năm"
  | string;

export interface Salary {
  type: SalaryType;
  min: number;
  max: number;
  currency: string;
  is_negotiable: boolean;
}

export interface Job {
  id: string;
  company: Company;
  title: string;
  slug: string;
  category: string;
  specialty: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  gender: GenderRequirement;
  quantity: number;
  salary: Salary;
  work_location: Address[];
  deadline: string;
  status: JobStatus;
  is_hot: boolean;
  description_html: string;
  requirements_html: string;
  benefits_html: string;
}
