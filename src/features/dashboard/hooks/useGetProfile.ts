import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { DashboardService } from "../services/dashboardService";
import { ProfileResponse } from "../types/profileResponse";

export const useGetProfile = (enabled = true) => {
  return useQuery<SuccessResponse<ProfileResponse>, AxiosError<ErrorResponse>>({
    queryKey: ["profile"],
    queryFn: () => DashboardService.getProfile(),
    enabled,
  });
};
