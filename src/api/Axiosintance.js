import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_KEY,
});

API.interceptors.request.use(
  (config)=>{
    const token = Cookies.get("token");
    if(token){
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error)=> Promise.reject(error)
);

API.interceptors.response.use(
  (response)=> response,
   (error)=> Promise.reject(error)
)

export default API;
