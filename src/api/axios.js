import axios from "axios";
import env from "../config/environment";

const axiosInstance = axios.create({
    // baseURL: "http://100.25.202.112:3005/v1/"
    baseURL: env.BASE_URL,
})

export default axiosInstance;