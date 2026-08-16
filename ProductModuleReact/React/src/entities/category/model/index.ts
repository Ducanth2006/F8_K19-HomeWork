export interface ICatiegoryGroup {
    id: string;
    group_name: string;
    group_slug: string;
    categories?: ICategories[];
}
export interface ICategories {
    id: string;
    name: string;
    slug: string;
}