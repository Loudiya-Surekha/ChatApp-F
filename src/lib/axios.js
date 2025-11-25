import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:5001/api",
    baseURL: "https://chatapp-b-k6ft.onrender.com/api", //https://chatapp-b-k6ft.onrender.com
    withCredentials: true,
})