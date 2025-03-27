import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ProvinceService } from "../services/provinceService";
import { ProvinceResponse } from "../types/provinceResponse";

export const useActiveProvince = () => {
  return useMutation<
    SuccessResponse<ProvinceResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => ProvinceService.active(request),
  });
};
