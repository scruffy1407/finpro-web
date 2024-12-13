import axios from "axios";

export const job = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_JOBLP_URL
})