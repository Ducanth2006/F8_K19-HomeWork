import type { IJobCard } from "../../shared/interface";
import {useState} from "react"
function Card({
  id,
  title,
  experience_level,
  quantity,
  salary,
  is_hot,
  company,
}: IJobCard) {
  const[heart,setHeart]=useState<boolean>(false);
  const isHot = () => (
    <p className="bg-red-500 text-white rounded-3xl w-10 text-center text-sm h-5">HOT</p>
  );
  
  return (
    <>
      <div className="flex justify-between p-3 h-40 w-full bg-green-50 border-green-100 border transition-all duration-150 hover:-translate-y-1 hover:border-green-500 rounded-2xl">
        <div className="flex gap-5 w-[445px] ">
          <img className="w-22 h-22" src={company.logo_url} alt={company.short_name} />
          <div className="flex flex-col gap-1">
            {is_hot && isHot()}
            <p className="text-lg text-black font-bold">{title}</p>
            <p>{company.short_name}</p>
            <div className="flex gap-4">
              <p className="p-1 bg-gray-400 text-sm rounded-2xl" >{experience_level}</p>
              <p className="p-1 bg-gray-400 text-sm rounded-2xl">Tuyển: {quantity}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between  ">
          <p className="font-medium text-green-500 text-sm ">
            {salary.min} - {salary.max} {salary.currency}
          </p>
          <div className="flex gap-5 ">
            <button className="bg-green-500 p-2 text-white rounded-2xl w-25 cursor-pointer active:bg-green-600 transition-all duration-150 active:translate-y-1">Ứng tuyển</button>
            <button className="text-green-500 items-center align-middle cursor-pointer " onClick={()=>setHeart(!heart)}>
              <i className={!heart?"fa-regular fa-heart":"fa-solid fa-heart"} ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;