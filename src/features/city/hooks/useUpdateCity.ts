import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { CityResponse } from "../types/cityResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CityRequest } from "../types/cityRequest";
import { CityService } from "../services/CityService";

export const useUpdateCity = () => {
  return useMutation<
    SuccessResponse<CityResponse>,
    AxiosError<ErrorResponse>,
    CityRequest & { idCity: number }
  >({
    mutationFn: ({ idCity, ...request }) => CityService.update(idCity, request),
  });
};
