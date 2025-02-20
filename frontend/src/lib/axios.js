import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.mode === "development" ? "http://localhost:5001/api" : "/api",  // dynamic endpoint
    withCredentials: true // will allow us to send cookies in each request to the server
})

export default axiosInstance