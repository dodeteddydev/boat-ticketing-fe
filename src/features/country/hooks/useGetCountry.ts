import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CountryResponse } from "../types/countryResponse";
import { CountryService } from "../services/countryService";

export const useGetCountry = (enabled = true) => {
  return useQuery<
    SuccessListResponse<CountryResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["country"],
    queryFn: () => CountryService.get(),
    enabled,
  });
};
