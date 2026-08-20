import {useNavigate} from "react-router"


interface SumCompanyProps {
  id?: string;
  cate?: string;
  shortName?: string;
  email?: string;
  companySize?: string;
  logo?: string;
  companyName?: string;
}

function SumCompany({
  id,
  cate,
  shortName,
  email,
  logo,
  companySize,
  companyName,
}: SumCompanyProps) {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/cong-ty/${id}`)
  }
  return (
    <div className="flex flex-col  bg-white rounded-2xl gap-4 p-6 sm:p-8 border border-slate-100 shadow-xs">
      <div className="flex gap-5">
        <img
          className="w-22 h-22 object-cover rounded-2xl"
          src={logo}
          alt={shortName}
        />
        <div>
          <h3 className="text-xl font-bold">{shortName}</h3>
          <p className="line-clamp-2 text-gray-400 font-medium">
            {companyName}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 items-center font-medium">
        <i className="fa-solid text-gray-300 fa-user-group"></i>
        <p className="text-gray-300">Quy mô :</p>
        <p>{companySize}</p>

        <i className="fa-solid text-gray-300 fa-user-group"></i>
        <p className="text-gray-300">Lĩnh vực :</p>
        <p>{cate}</p>

        <i className="fa-solid text-gray-300 fa-user-group"></i>
        <p className="text-gray-300">Email :</p>
        <p>{email}</p>
      </div>
      <button className="mt-4 flex gap-3 border border-green-400 rounded-full justify-center items-center px-4 py-2 text-emerald-600 font-medium hover:bg-green-100 cursor-pointer" onClick={handleClick}><p>Xem trang công ty</p> <i className="fa-solid text-2xl fa-square-arrow-up-right"></i> </button>
    </div>
  );
}
export default SumCompany;
