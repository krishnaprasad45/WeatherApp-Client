import axios from "axios";

const authURL = import.meta.env.VITE_APIURL;

export const userAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json", // JSON content type
    },
});

userAxios.interceptors.request.use((config) => {
    const token = 'no-token-for-now'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
