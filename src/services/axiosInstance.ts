import axios, { AxiosError } from "axios";
import { RefreshResponse } from "../types/refreshResponse";
import { SuccessResponse } from "../types/successResponse";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = LocalStorageHelpers.getAccessToken();
    if (token) {
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }

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
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.get<SuccessResponse<RefreshResponse>>(
          `${baseUrl}/auth/refresh`,
          { withCredentials: true }
        );

        LocalStorageHelpers.setToken(data.data.accessToken);
      } catch (err) {
        const axiosError = err as AxiosError;
        return Promise.reject<AxiosError>(axiosError);
      }
    }

    return Promise.reject<AxiosError>(error);
  }
);
