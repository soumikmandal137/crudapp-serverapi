import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_KEY,
});

export default API;
