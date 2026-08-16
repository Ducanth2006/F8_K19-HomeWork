import type {ICatiegoryGroup,ICategories} from "@/entities/category";

interface SubMenuProps{
    cateGroups:ICatiegoryGroup[],
    id:string|number
}
function SubMenu({ cateGroups, id }: SubMenuProps) {
    const isExist=cateGroups.find((c)=>c.id===id)
    if(!isExist) return <div className="grid grid-cols-2 justify-between p-3 bg-white "><p>Not found</p></div>;
    if(!isExist.categories) return <div  className="grid grid-cols-2 content-start gap-2 rounded-2xl bg-white text-sm p-3 h-68 overflow-y-auto "><p>Not found</p></div>
    const categories:ICategories[]=isExist.categories||[];
 
  return (
    <div className="grid grid-cols-2 content-start gap-2 rounded-2xl bg-white text-sm p-3 h-68 overflow-y-auto ">
          {categories.map((c)=>{
            return <p className="py-1 w-fit grid-cols-1 px-3 bg-gray-200 rounded-full" key={c.id}>{c.name}</p>
          })} 
    </div>
  );
}
export default SubMenu;
