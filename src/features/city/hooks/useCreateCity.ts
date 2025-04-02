import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { CityResponse } from "../types/cityResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CityRequest } from "../types/cityRequest";
import { CityService } from "../services/CityService";

export const useCreateCity = () => {
  return useMutation<
    SuccessResponse<CityResponse>,
    AxiosError<ErrorResponse>,
    CityRequest
  >({
    mutationFn: (request) => CityService.create(request),
  });
};
