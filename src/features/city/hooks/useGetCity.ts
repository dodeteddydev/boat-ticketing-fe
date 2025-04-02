import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CityResponse } from "../types/cityResponse";
import { CityService } from "../services/CityService";
import { CityParams } from "../types/cityParams";

export const useGetCity = (enabled = true, params?: CityParams) => {
  return useQuery<
    SuccessListResponse<CityResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["city", params],
    queryFn: () => CityService.get(params),
    enabled,
  });
};
