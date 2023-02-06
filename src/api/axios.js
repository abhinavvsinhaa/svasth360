import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://3.80.197.55:3005/v1/"
    baseURL: "http://10.0.2.2:3005/v1/",
})

export default axiosInstance;