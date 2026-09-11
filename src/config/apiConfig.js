import axios from "axios"

export const API_BASE_URL = "https://13.204.66.133:8000/"

export const api=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

api.interceptors.request.use(config => {
    const jwt = localStorage.getItem("jwt");
    const role=localStorage.getItem("role");
    if (jwt) {
        config.headers["Authorization"] = `Bearer ${jwt}`;
        config.headers["Role"] = role;
    }
    console.log("API request headers:", config.headers)
    return config;
}, error => {
    return Promise.reject(error);
});