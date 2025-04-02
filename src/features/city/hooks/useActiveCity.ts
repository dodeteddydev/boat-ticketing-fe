import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CityResponse } from "../types/cityResponse";
import { CityService } from "../services/CityService";

export const useActiveCity = () => {
  return useMutation<
    SuccessResponse<CityResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => CityService.active(request),
  });
};
