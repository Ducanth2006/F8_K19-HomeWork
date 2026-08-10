import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { NavLink } from "react-router";

interface ICompanyDetail {
  id: number;
  company_name: string;
  tax_code: string;
  director: string;
  email: string;
  phone_number: number;
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
function CompanyDetail() {
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
            <p className="text-sm "> teen</p>
          </div>
          {/* Header */}
          <div className="w-full flex justify-between bg-white rounded-2xl p-2 items-center">
            <div>
              <div className="flex gap-2 lg:gap-5 items-center">
                <img
                  className="w-20 h-20 lg:w-35 lg:h-35 object-cover overflow-hidden rounded-2xl"
                  src="https://placehold.co/600x400"
                  alt=""
                />
                <div>
                  <h1 className="text-3xl font-bold">Name</h1>
                  <div className="flex gap-2 text-gray-300 font-medium text-sm">
                    <p>email</p>
                    <p>phone</p>
                    <p>taxcode</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-center h-12 w-40 mr-30  rounded-2xl text-white "> + Theo dõi </button>
          </div>
          {/* Body */}
          <div className="grid grid-cols-3"></div>
        </div>
      </div>
    </>
  );
}
export default CompanyDetail;
