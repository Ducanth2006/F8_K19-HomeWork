import { useState, useRef,useEffect } from "react";
import {toast} from "react-toastify"

import MegaMenu from "../MegaMenu";
import type {NavigationItems} from "../../model"
import { getCategories } from "../CategoriesApi";
import type { CategoriesGroup } from "../../model";

const titles: NavigationItems[] = [
  { name: "Việc làm" ,id:1 ,type:"JobMenu" },
  { name: "Tạo CV" ,id:2 ,type:"MakingCv"},
  { name: "Công cụ",id:3 ,type:"Tools"},
  { name: "Cẩm nang nghề nghiệp" ,id:4,type:"GuidanceCareer" },
];
function HeaderNav() {
  const [categoryGroups,setCategoryGroup] =useState<CategoriesGroup[]>([])
  const [menuActive, setmenuActive] = useState<string | null>(null);
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      if (data) {
        setCategoryGroup(data);
        console.log("get Cate")
      } else {
        toast.error("get categoriesGroup có lỗi ");
      }
    };
    fetchData();
  }, []);
  const handleMouseEnter = (name: string) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    console.log(name)
    setmenuActive(name);
  };
  const handleMouseLeave = () => {
    timeRef.current = setTimeout(() => {
      setmenuActive(null);
    }, 350);
  };

  return (
    <>
      <ul className="flex gap-10  ">
        {titles.map((t) => {
          return (
            <li
              key={t.id}
              onMouseEnter={() => handleMouseEnter(t.name)}
              onMouseLeave={handleMouseLeave}
              className=" relative font-semibold  text-[14px] pb-1 items-center text-black hover:text-green-600 transition-all duration-300 ease-out transform -translate-y-1 hover:translate-y-0 hover:border-b hover:rounded-b-xs cursor-pointer"
            >
              {t.name}
              {menuActive === t.name && (
                <MegaMenu
                  onMouseEnter={() => handleMouseEnter(t.name)}
                  onMouseLeave={handleMouseLeave}
                  typeMenu={t.type}
                  categoryGroups={categoryGroups}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default HeaderNav;
