import {useEffect,useState,memo}from "react";
import {toast} from "react-toastify"


import type {MegaMenuPros} from "../../model"
import JobMenu from "./JobMenu"

function MegaMenu({onMouseLeave,onMouseEnter,typeMenu,categoryGroups}:MegaMenuPros) {
  console.log("render menu mega")
  return (
    <>
      <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className="absolute top-12 left-0  ">
       {typeMenu==="JobMenu"&&<JobMenu categoryGroups={categoryGroups}/>}
      </div>
    </>
  );
}
export default memo(MegaMenu);