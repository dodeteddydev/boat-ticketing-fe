import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { ProvinceResponse } from "../types/provinceResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { ProvinceRequest } from "../types/provinceRequest";
import { ProvinceService } from "../services/provinceService";

export const useUpdateProvince = () => {
  return useMutation<
    SuccessResponse<ProvinceResponse>,
    AxiosError<ErrorResponse>,
    ProvinceRequest & { idProvince: number }
  >({
    mutationFn: ({ idProvince, ...request }) =>
      ProvinceService.update(idProvince, request),
  });
};
