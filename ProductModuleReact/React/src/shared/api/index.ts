import axios from "axios";

const Base_URL = "http://localhost:8000/api/v1";
const api = axios.create({
  baseURL: Base_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

export interface ApiResponseError<T = unknown> {
  message: string;
  code: number;
  errors?: T;
}