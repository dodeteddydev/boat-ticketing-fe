import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CityService } from "../services/CityService";
import { CityResponse } from "../types/cityResponse";

export const useDeleteCity = () => {
  return useMutation<
    SuccessResponse<CityResponse>,
    AxiosError<ErrorResponse>,
    { idCity: number }
  >({
    mutationFn: ({ idCity }) => CityService.delete(idCity),
  });
};
