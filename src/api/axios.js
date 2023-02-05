import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://3.80.197.55:3005/v1/",
})

export default axiosInstance;