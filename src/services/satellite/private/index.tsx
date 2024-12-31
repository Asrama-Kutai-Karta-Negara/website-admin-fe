import { MessageResponse } from "@interfaces/data-types";
import { getCookiesStore } from "@store/cookiesStore";
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const SatellitePrivate: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_API_KEY,
  },
});

SatellitePrivate.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getCookiesStore();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

SatellitePrivate.interceptors.response.use(
  (response: AxiosResponse<MessageResponse>) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default SatellitePrivate;
