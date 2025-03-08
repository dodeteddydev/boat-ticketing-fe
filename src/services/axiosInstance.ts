import axios from "axios";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = LocalStorageHelpers.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // axios.get()

      console.log(error);
    }

    return Promise.reject(error);
  }
);
