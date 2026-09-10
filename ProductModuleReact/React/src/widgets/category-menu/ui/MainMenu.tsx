import { useState, useEffect } from "react";

import type { ICatiegoryGroup } from "@/entities/category";


export interface HomeMenuProps {
  cateGroups: ICatiegoryGroup[],
  isLoading: boolean,
  activeGroup?: ICatiegoryGroup | null,
  onHoverGroup: (id: string | number) => void
  activeGroupId: string | number | null
}
function MainMenu({cateGroups,isLoading,onHoverGroup}:HomeMenuProps) {

  return (
   
      <div className="col-span-4 h-68 p-3 bg-white rounded-2xl flex flex-col ">
        {/* Content */}
        {!isLoading && (
          <div className="flex flex-col justify-center pb-5 items-center gap-4 text-[#263a4d] ">
            {cateGroups.map((c) => {
              return (
                <div
                  className=" text-sm font-medium hover:text-green-400 max-w-60 truncate"
                  key={c.id}
                  onMouseEnter={()=>onHoverGroup(c.id)}
                >
                  {c.group_name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    
  );
}
export default MainMenu;
