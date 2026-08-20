import type { ICompanyCard } from "../../model/types";
function CompanyCard({
    id,
    short_name,
    card_media,
    short_description,
    logo_url,
}: ICompanyCard) {
    return (
        <>
            <div className="w-full h-full flex flex-col overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 rounded-2xl bg-white">
                <div className="relative w-full aspect-video">
                    <img
                        src={`${card_media}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt=""
                    />
                    <div className="absolute w-16 h-16">
                        <img
                            src={`${logo_url}`}
                            alt=""
                            className="w-full h-auto object-contain flex items-center justify-center absolute -top-16 z-14 border bg-white"
                        />
                    </div>
                </div>
                <div className="px-2 py-3">
                    <h3 className="font-bold hover:underline-offset-1">{short_name}</h3>{" "}
                    <p className="line-clamp-5 text-sm">{short_description}</p>
                </div>
            </div>
        </>
    );
}
export default CompanyCard;
