import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { CountryResponse } from "../types/countryResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CountryRequest } from "../types/countryRequest";
import { CountryService } from "../services/countryService";

export const useUpdateCountry = () => {
  return useMutation<
    SuccessResponse<CountryResponse>,
    AxiosError<ErrorResponse>,
    CountryRequest & { idCountry: number }
  >({
    mutationFn: ({ idCountry, ...request }) =>
      CountryService.update(idCountry, request),
  });
};
