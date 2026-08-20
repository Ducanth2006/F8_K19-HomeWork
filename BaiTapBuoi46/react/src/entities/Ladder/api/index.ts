import {api} from "@/shared/api/api"
import type {Prize} from "../model/prizes"

export const getPrizes=async ():Promise<Prize[]>=>{
    const res=await api.get("/prizes");
    return res.data;
}
export const getPrizeById=async(id:string):Promise<Prize>=>{
    const res= await api.get(`/prizes/${id}`);
    return res.data;
}