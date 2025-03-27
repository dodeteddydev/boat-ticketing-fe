import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { ProvinceResponse } from "../types/provinceResponse";
import { ProvinceService } from "../services/provinceService";
import { CountryParams } from "../types/countryParams";

export const useGetProvince = (enabled = true, params?: CountryParams) => {
  return useQuery<
    SuccessListResponse<ProvinceResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["province", params],
    queryFn: () => ProvinceService.get(params),
    enabled,
  });
};
