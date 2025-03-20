import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CountryService } from "../services/countryService";
import { CountryResponse } from "../types/countryResponse";

export const useDeleteCountry = () => {
  return useMutation<
    SuccessResponse<CountryResponse>,
    AxiosError<ErrorResponse>,
    { idCountry: number }
  >({
    mutationFn: ({ idCountry }) => CountryService.delete(idCountry),
  });
};
