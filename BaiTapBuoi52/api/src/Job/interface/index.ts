export interface Job {
  id: string;
  category_id: number;
  company_id: number;
  title: string;
  description: string;
  requirement: string;
  benefit: string;
  experience?: number|null;
  due_date: string; // Định dạng YYYY-MM-DD
  quantity: number;
  min_salary?: number|null;
  max_salary?: number|null;
  qualification?: string|null;
  work_type?: string|null;
  working_time ?: string|null;
  created_at: string; // ISO timestamp string
  created_by?: string|null;
  modified_at?: string | null;
  modified_by?: string | null;
  deleted_at?: string | null;
  deleted_by?: number | null;
  active: boolean;
}