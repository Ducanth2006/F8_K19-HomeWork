import {useState,useEffect,useCallback} from "react"
import type {JobDetailPage} from "./types"
import {getJobBySlug} from "../api"

export const useJobDetail=(slug:string)=>{
    const [job,setJob] =useState<JobDetailPage|null>(null);
    const [isLoading,setLoading]=useState<boolean>(true);
    const [hasError,setError] =useState<string|null>(null);
    const fetchJobDetail =useCallback(async ()=>{
        if(!slug){
            setLoading(false);
            return
        }
        try{
            setLoading(true)
            setError(null)
            const res=await getJobBySlug(slug);
            setJob(res);
        }catch(e){
            console.log("Having error when get job by slug : ",e)
            setError("Can't load information please try again later")
        }finally{
            setLoading(false);
        }
    },[slug])
    useEffect(()=>{fetchJobDetail()},[fetchJobDetail]
    )
    return {
        job,isLoading,hasError,refetch:fetchJobDetail
    }
}
