import { useState, useEffect } from "react";

import type { ICatiegoryGroup } from "@/shared/interface";
import type{HomeMenuProps} from "@/shared/interface"
import Pagination from "@/components/Pagination";

function MainMenu({cateGroups,isLoading,currentPage,totalPages,onPageChange,onHoverGroup}:HomeMenuProps) {

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
        {/* Pagination */}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="text-lg"
        />
      
      </div>
    
  );
}
export default MainMenu;
