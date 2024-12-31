import { MessageResponse } from "@interfaces/data-types";
import axios, { AxiosResponse } from "axios";

const SatellitePublic = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_API_KEY,
  },
});

axios.interceptors.response.use(
  (response: AxiosResponse<MessageResponse>) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default SatellitePublic;
