import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CountryService } from "../services/countryService";
import { CountryResponse } from "../types/countryResponse";

export const useActiveCountry = () => {
  return useMutation<
    SuccessResponse<CountryResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest & { idCountry: number }
  >({
    mutationFn: ({ idCountry, ...request }) =>
      CountryService.active(idCountry, request),
  });
};
