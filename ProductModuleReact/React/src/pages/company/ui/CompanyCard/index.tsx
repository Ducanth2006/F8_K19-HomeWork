import type { ICompanyCard } from "../../../../shared/interface";
function CompanyCard({
  id,
  short_name,
  card_media,
  short_description,
  logo_url,
}: ICompanyCard) {
  return (
    <>
      <div className="w-40 lg:w-90 h-75 lg:h-100 flex flex-col  overflow-hidden rounded-t-2xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 rounded-2xl">
        <div className="relative  w-full aspect-video ">
          <img
            src={`${card_media}`}
            className="object-cover  transition-transform duration-500 group-hover:scale-105"
            alt=""
          />
          <div className="absolute w-16 h-16 ">
            <img
              src={`${logo_url}`}
              alt=""
              className="w-full h-auto object-contain  flex items-center justify-center absolute -top-10 z-14 border"
            />
          </div>
        </div>
        <div className="px-2 py-3">
          <h3 className="font-bold hover:underline-offset-1">{short_name}</h3>{" "}
          <p className="line-clamp-5">{short_description}</p>
        </div>
      </div>
    </>
  );
}
export default CompanyCard;
