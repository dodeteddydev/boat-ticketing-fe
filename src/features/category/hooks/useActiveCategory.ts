import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CategoryService } from "../services/categoryService";
import { CategoryResponse } from "../types/categoryResponse";

export const useActiveCategory = () => {
  return useMutation<
    SuccessResponse<CategoryResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => CategoryService.active(request),
  });
};
