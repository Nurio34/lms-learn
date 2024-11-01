import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const storage = sessionStorage.getItem("token");

        if (!storage) {
            // console.log("No token in Storage");
        } else {
            const token = JSON.parse(storage);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle errors in the request configuration

        return Promise.reject(error);
    },
);

export default axiosInstance as any;
