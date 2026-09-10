import api from "@/shared/api";
import axios,{AxiosError } from "axios";
import {type candidateRegisterRequest} from "../model"


export interface  registerAcceptedResponse {
    access_token:string,
    user:{
        id:string,
        email:string,
        role:string
    }
}
export interface registerRejectedResponse{
    message:string,
    code:number
}
export const candidateRegister= async(data:candidateRegisterRequest):Promise<registerAcceptedResponse>=>{
   try{
     const res= await api.post("/auth/register",data)
     return res.data;

   }catch(e){
    if(axios.isAxiosError<registerRejectedResponse>(e)){
        const message=e.response?.data?.message||"Đăng ký thất bại";
        throw new Error(message);
    }
    throw e;
   }

}
