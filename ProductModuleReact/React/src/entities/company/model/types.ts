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