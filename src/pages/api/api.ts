import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL,
});

//
// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("token");
//   if (token && (config.url as string).startsWith("/api/user")) {
//     console.log(config.url);
//     // Check if URL starts with '/api/user'
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
