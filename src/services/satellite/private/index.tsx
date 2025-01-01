import {refreshAccessToken } from "@services/auth/01-auth";
import { getCookiesStore } from "@store/cookiesStore";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

SatellitePrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const oldToken = await getCookiesStore();
      if (oldToken) {
        const newToken = await refreshAccessToken(oldToken);
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return SatellitePrivate(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default SatellitePrivate;
