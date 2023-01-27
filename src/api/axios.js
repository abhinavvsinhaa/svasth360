import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3005/v1/",
    timeout: 1000,
    timeoutErrorMessage: "Timeout while trying to reach server!!"
})

export default axiosInstance;