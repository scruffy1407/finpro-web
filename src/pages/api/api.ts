import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
