import api from "../../../shared/api";

export  const getCategories=async()=>{
    try{
        const res=await api.get("/category_groups");
        return res.data;

    }catch(e){
        console.log("Getting categories has error: ",e)
    }
}
