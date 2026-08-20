import {api} from "@/shared/api/api";
import type { Question } from "@/entities/Question/model/question";


export const getQuestions=async ():Promise<Question[]>=>{
    const res = await api.get("/questions");
    return res.data;
}
export const getQuestionById=async (id:string):Promise<Question>=>{
    const res= await api.get(`/questions/${id}`);
    return res.data
}
export const getQuestionsBackup=async ():Promise<Question[]>=>{
    const res= await api.get("/backupQuestions");
    return res.data
}
export const getQuestionBackupById=async(id:string):Promise<Question>=>{
    const res= await api.get(`/backupQuestions/${id}`);
    return res.data;
}