import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44392/',
});

api.interceptors.request.use(
    (config) => {
        const Accesstoken = localStorage.getItem('accessToken');
        if (Accesstoken) {
            config.headers.Authorization = `Bearer ${Accesstoken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
