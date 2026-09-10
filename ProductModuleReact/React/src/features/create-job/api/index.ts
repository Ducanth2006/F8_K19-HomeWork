import axios from "axios"

import api, {type ApiResponseError} from "@/shared/api"
import { getAccessToken } from "@/shared/lib/token"
import {type JobCreateFormOutput} from "../model"
import {type Job} from "@/entities/job/model/createJobTypes"

type creatJobError = ApiResponseError;
export const createJob=async (data:JobCreateFormOutput):Promise<Job> => {
    const token=getAccessToken()
    try{
        const res=await api.post("/employer/jobs",data,{headers:{Authorization:`Bearers ${token}`,Accept:"application/json"}})
        return res.data;
    }catch(e){
        if(axios.isAxiosError<creatJobError>(e)){
            const message=e.response?.data.message||"Tạo Job thất bại"
            throw new Error(message)
        }
        throw e;

    }
}