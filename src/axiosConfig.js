import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Your backend URL
});

export default axiosInstance;