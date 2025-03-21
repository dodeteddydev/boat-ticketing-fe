import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CountryResponse } from "../types/countryResponse";
import { CountryService } from "../services/countryService";
import { ListParams } from "../../../types/listParams";

export const useGetCountry = (enabled = true, params?: ListParams) => {
  return useQuery<
    SuccessListResponse<CountryResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["country", params],
    queryFn: () => CountryService.get(params),
    enabled,
  });
};
