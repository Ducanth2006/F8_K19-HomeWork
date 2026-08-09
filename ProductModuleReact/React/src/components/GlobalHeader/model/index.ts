export interface MegaMenuPros {
  onMouseLeave:()=>void,
  onMouseEnter:()=>void
  typeMenu:string
   categoryGroups:CategoriesGroup[]

}

export interface NavigationItems {
  name: string;
  id:number;
  type:string
 
}
export interface Category{
    id:string,
    name:string,
    slug:string
}
export interface CategoriesGroup{
    id:string;
    group_name:string;
    group_slug:string;
    categories: Category[];
}
export interface JobMenuLevel2Props{
     categories: Category[];
}