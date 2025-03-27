import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ProvinceService } from "../services/provinceService";
import { ProvinceResponse } from "../types/provinceResponse";

export const useDeleteProvince = () => {
  return useMutation<
    SuccessResponse<ProvinceResponse>,
    AxiosError<ErrorResponse>,
    { idProvince: number }
  >({
    mutationFn: ({ idProvince }) => ProvinceService.delete(idProvince),
  });
};
