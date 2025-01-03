import { formatMessage } from "@interfaces/data-types";
import axios, { AxiosResponse } from "axios";

const SatellitePublic = axios.create({
  baseURL: process.env.NEXT_BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_API_KEY,
  },
});

SatellitePublic.interceptors.response.use(
  (response: AxiosResponse<formatMessage>) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default SatellitePublic;
