import axios, { AxiosError } from "axios";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";
import { RefreshResponse } from "../types/refreshResponse";
import { SuccessResponse } from "../types/successResponse";

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
  async (error: AxiosError) => {
    const refreshToken = LocalStorageHelpers.getRefreshToken();

    if (refreshToken && error.response?.status === 401) {
      try {
        const { data } = await axios.post<SuccessResponse<RefreshResponse>>(
          `${baseUrl}/auth/refresh`,
          { refreshToken }
        );

        LocalStorageHelpers.setToken(
          data.data.accessToken,
          data.data.refreshToken
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        LocalStorageHelpers.removeToken();
      }
    }

    if (!refreshToken) {
      LocalStorageHelpers.removeToken();
      return Promise.reject<AxiosError>(error);
    }

    return Promise.reject<AxiosError>(error);
  }
);
