import type { ICompanyCard } from "@/entities/company"

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
export interface JobCardHomePageDatas extends Pick<IJobCard, "id" | "slug" | "job_type" | "title" | "salary"> {
    company: Pick<ICompanyCard, "id" | "logo_url" | "short_name">;
}
export interface JobCardHomePageProps {
    job: JobCardHomePageDatas
    onSelectJob?: (id: string) => void;
}