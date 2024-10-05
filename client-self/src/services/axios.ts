import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/",
});

axiosInstance.interceptors.request.use((config) => {
    const storage = sessionStorage.getItem("token");

    if (!storage) {
        console.log("Thre is no token stored !");
    } else {
        const token = JSON.parse(storage);
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
