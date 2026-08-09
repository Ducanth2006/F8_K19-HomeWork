import { memo, useState, useRef } from "react";

import type { CategoriesGroup } from "../../../model";
import MenuLevel2 from "./MenuLevel2";
interface JobMenuProps {
  categoryGroups: CategoriesGroup[];
}

function JobMenu({ categoryGroups }: JobMenuProps) {
  const [isOpen, setOpen] = useState<string | null>(null);
  const timeRef = useRef<number | null>(null);
  const handleMouseEnter = (id: string) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    setOpen(id);
  };
  const handleMouseLeave = () => {
    timeRef.current = setTimeout(() => {
      setOpen(null);
    }, 350);
  };
  if(categoryGroups.length===0) return null

  return (
    <>
      <ul className="w-110 bg-white  p-2 flex gap-5 flex-col rounded-lg ">
        {categoryGroups.map((c) => {
          return (
            <li
              onMouseEnter={() => handleMouseEnter(c.id)}
              onMouseLeave={() => handleMouseLeave()}
              key={c.id}
              className="text-[14px] text-center pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer"
            >
              {c.group_name}
              {isOpen === c.id && <MenuLevel2 categories={c.categories} />}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default memo(JobMenu);
