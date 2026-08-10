import api from "../../../shared/api";
export const getCompanies=async ()=>{
    try{
        const res=await api.get("/companies")
        return res.data;
    }catch(e){
        console.log("get companies api has error: ",e)
    }
}