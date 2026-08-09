import axios from "axios";

const Base_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: Base_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;