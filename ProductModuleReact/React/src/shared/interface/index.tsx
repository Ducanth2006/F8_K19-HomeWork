export interface ICompanyCard{
    id:string
    short_name:string
    card_media:string
    short_description:string
    logo_url:string
}
export interface IJobCard{
    id:string;
    title:string;
    slug:string;
    category:string;
    job_type:string;
    experience_level:string;
    gender:string;
    quantity:string;
    salary:ISalary;
    deadline:string;
    status:string;
    is_hot:boolean;
    description_html:string;
    requirements_html:string;
    benefits_html:string;
    company:ICompanyCard;
}
export interface ISalary{
    min:number;
    max:number;
    currency:string;
    is_negotiable:boolean;
}