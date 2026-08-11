import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router";
import DOMPurify from "dompurify";

import { getCompanies } from "./api";
import type { IJobCard } from "../../shared/interface";
import { getJobByCompanyId } from "./api";
import Card from "../../components/JobCard";

interface ICompanyDetail {
  id: number;
  company_name: string;
  website: string;
  tax_code: string;
  director: string;
  email: string;
  phone_number: string;
  company_size: string;
  category: string;
  address_list: IAddress[];
  description_html: string;
  logo_url: string;
}
interface IAddress {
  city_id: number;
  city_name: string;
  address_detail: string;
}
interface CommonInfoItem {
  name: string;
  icon: string;
  props: keyof ICompanyDetail; // ✨ Giúp TypeScript hiểu props là key hợp lệ
}
const commonInfo: CommonInfoItem[] = [
  { name: "Mã số thuế", icon: "fa-solid fa-key", props: "tax_code" },
  { name: "Quy mô nhân sự", icon: "fa-solid fa-users", props: "company_size" },
  { name: "Giám đốc", icon: "fa-solid fa-user-tie", props: "director" },
  { name: "Số điện thoại", icon: "fa-solid fa-phone", props: "phone_number" },
];
function CompanyDetail() {
  const [jobs,setJobs] =useState<IJobCard[]>([])
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await getCompanies(id);
      setCompanyDetail(data);
    };
    const getJobs= async ()=>{
      const data=await getJobByCompanyId(id);
      setJobs(data);
    }
    fetchData();
    getJobs();
  }, [id]);
  const cleanHtml = DOMPurify.sanitize(
    companyDetail?.description_html as string,
  );
  const handleClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <div className="w-full bg-[#f3f5f7]">
        <div className="container mx-auto px-3 sm:px-25  lg:px-50 flex flex-col gap-5">
          <div className="flex gap-4  py-4 items-center">
            <NavLink
              to={"/"}
              className="text-sm hover:text-green-500 hover:underline transition-all ease-in duration-150 hover:translate-y-0.5 cursor-pointer"
            >
              Trang chủ &gt;
            </NavLink>
            <NavLink
              to={"/cong-ty"}
              className="text-sm hover:text-green-500 hover:underline transition-all ease-in duration-150 hover:translate-y-0.5 cursor-pointer"
            >
              Công ty &gt;
            </NavLink>
            <p className="text-sm "> {companyDetail?.company_name}</p>
          </div>
          {/* Header */}
          <div className="w-full flex justify-between bg-white rounded-2xl p-2 items-center">
            <div>
              <div className="flex gap-2 lg:gap-5 items-center">
                <img
                  className="w-20 h-20 lg:w-35 lg:h-35 object-cover overflow-hidden rounded-2xl"
                  src={companyDetail?.logo_url}
                  alt=""
                />
                <div>
                  <h1 className="text-xl font-bold mb-5">
                    {companyDetail?.company_name}
                  </h1>
                  <div className=" gap-5 hidden text-gray-300 font-medium text-sm lg:flex">
                    <a href={companyDetail?.website}>
                      Website {(companyDetail?.website)?.slice(12)}
                    </a>
                    <p>Email: {companyDetail?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-center h-12 w-40 mr-30  rounded-2xl text-white ">
              + Theo dõi
            </button>
          </div>
          {/* Body */}
          <div className="grid grid-cols-3 gap-2">
            {/* Introduction section */}
            <div className="col-span-2 bg-white rounded-2xl px-2 ">
              <div className={`relative transition-all duration-300 ease-out ${isExpanded?"":"max-h-100 overflow-hidden"}`}>
                <div
                  className="prose "
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                ></div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>
              <div className="text-center hover:bg-linear-to-b from-green-100 to-white "><button onClick={handleClick} className="text-green-500 hover:underline font-semibold">{isExpanded?"Thu gọn":"Xem thêm"}</button></div>
            </div>
            {/* Common information */}
            <div className="col-span-1 bg-white rounded-2xl p-2 h-fit  ">
              <h2 className="text-2xl mt-5 mb-4">Thông tin chung</h2>
              <ul className="flex gap-5 flex-col">
                {commonInfo.map((i) => {
                  const value = companyDetail?.[i.props];
                  return (
                    <li key={i.name} className="flex gap-4 items-center">
                      <i className={i.icon}></i>
                      <div className="text-gray-500">
                        <p>{i.name}</p>
                        <p>{value as React.ReactNode}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Job list by company id */}
            <div className="col-span-2 bg-white rounded-2xl px-2 "><h3 className="p-4 text-xl font-medium">Tin tuyển dụng</h3><ul className="flex flex-col gap-2">{jobs.map((j)=><li key={j.id}><Card {...j}/></li>)}</ul></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CompanyDetail;
