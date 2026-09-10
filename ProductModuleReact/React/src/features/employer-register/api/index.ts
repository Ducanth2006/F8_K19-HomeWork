import axios from "axios";

import api from "@/shared/api";
import { type employerRegisterRequest } from "../model";
import type { registerRejectedResponse } from "@/features/candidate-register/api";

export interface employerRegisterSuccessedResponse {
  message: string;
}
export interface employerRegisterRejectedResponse {
  message: string;
  code: number;
}
export const employerRegister = async (
  info: employerRegisterRequest,
): Promise<employerRegisterSuccessedResponse> => {
  try {
    const res=await api.post("/companies/register",info)
    return res.data
  } catch (e) {if(axios.isAxiosError<registerRejectedResponse>(e)){
    const message=e.response?.data?.message;
    throw new Error(message);
  }throw e}
};
