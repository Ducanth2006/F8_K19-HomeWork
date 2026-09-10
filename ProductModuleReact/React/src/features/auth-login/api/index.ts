import axios from "axios"

import api from "@/shared/api"
import {type loginRequest} from "../model"
import {type ApiResponseError} from "@/shared/api"
 
export interface loginAcceptedResponse{
    access_token:string,
    user:{
        id:string,
        email:string,
        role:string
    }
}
export type loginRejectedResponse =ApiResponseError;

export const login=async(data:loginRequest):Promise<loginAcceptedResponse>=>{
    try{
        const res= await api.post("/auth/login",data);
        return res.data
    }catch(e){
        if(axios.isAxiosError<loginRejectedResponse>(e)){
            const message=e.response?.data.message||"Đăng nhập thất bại"
            throw new Error(message)
        }
        throw e;
    }
}