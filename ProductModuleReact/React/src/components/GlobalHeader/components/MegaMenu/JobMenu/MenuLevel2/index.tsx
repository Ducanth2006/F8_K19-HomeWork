import type {JobMenuLevel2Props} from "../../../../model"
function JobMenuLevel2({categories}:JobMenuLevel2Props){
    if(!categories) return null;
    return (<>
    <ul className="absolute -top-2 left-108 w-101 bg-white  p-2 flex gap-5 flex-col rounded-lg ">
        {categories.map((c) => {
          return (
            <li
              key={c.id}
              className="text-[14px] text-center pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer"
            >
              {c.name}
              
            </li>
          );
        })}
      </ul></>)
}
export default JobMenuLevel2;