// src/entities/job/model/types.ts
export interface Salary {
  type: string;
  min: number | null;
  max: number | null;
  currency: string;
  is_negotiable: boolean;
}

export interface WorkLocation {
  city_id: number | null;
  city_name: string | null;
  address_detail: string | null;
}

export interface JobCompanyInfo {
  id: string;
  status: string;
  verification_tier: string;
  tax_code: string;
  company_name: string;
  international_name?: string | null;
  short_name?: string | null;
  director?: string | null;
  headquarters_address?: string | null;
  email: string;
  phone_number: string;
  website?: string | null;
  logo_url?: string | null;
  company_size?: string | null;
  category?: string | null;
  address_list: string[];
  description_html?: string | null;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  category: string;
  specialty?: string | null;
  job_type: 'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'INTERNSHIP';
  experience_level?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'NOT_REQUIRED' | null;
  quantity?: number | null;
  salary: Salary;
  work_location: WorkLocation[];
  deadline: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  is_hot: boolean;
  description_html: string;
  requirements_html?: string | null;
  benefits_html?: string | null;
  company: JobCompanyInfo;
}