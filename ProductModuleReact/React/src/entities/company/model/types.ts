import type { Address } from '@/shared/types/location';

export interface ICompanyCard {
    id: string
    short_name: string
    card_media: string
    short_description: string
    logo_url: string
}
export interface ICompanyDetail {
    id: number;
    company_name: string;
    website: string;
    tax_code: string;
    director: string;
    email: string;
    phone_number: string;
    company_size: string;
    category: string;
    address_list: IAddress[];
    description_html: string;
    logo_url: string;
}
export interface IAddress {
    city_id: number;
    city_name: string;
    address_detail: string;
}
export type CompanyStatus = 'APPROVED' | 'PENDING' | 'REJECTED';
export type VerificationTier = 'VERIFIED' | 'UNVERIFIED';

export interface Company {
  id: string;
  status: CompanyStatus;
  verification_tier: VerificationTier;
  tax_code: string;
  company_name: string;
  international_name: string;
  short_name: string;
  director: string;
  headquarters_address: string;
  issued_date: string;
  email: string;
  phone_number: string;
  website: string;
  logo_url: string;
  company_size: string;
  category: string;
  address_list: Address[];
  description_html: string;
}