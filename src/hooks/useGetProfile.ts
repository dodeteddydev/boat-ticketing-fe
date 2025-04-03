import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "../services/axiosInstance";
import { ErrorResponse } from "../types/errorResponse";
import { SuccessResponse } from "../types/successResponse";

export type ProfileResponse = {
  id: number;
  role: string;
  name: string;
  username: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};

const getProfile = async () => {
  return axiosInstance
    .get<SuccessResponse<ProfileResponse>>("/auth/profile")
    .then((response) => response.data);
};

export const useGetProfile = (enabled = true) => {
  return useQuery<SuccessResponse<ProfileResponse>, AxiosError<ErrorResponse>>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled,
  });
};
