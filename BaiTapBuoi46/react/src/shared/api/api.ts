import axios from "axios";


const Base_URL = "http://localhost:3000";
export const api=axios.create({
    baseURL:Base_URL,
     headers: {
    "Content-Type": "application/json",
  },

})
