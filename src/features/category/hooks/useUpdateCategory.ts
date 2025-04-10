import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { CategoryResponse } from "../types/categoryResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CategoryRequest } from "../types/categoryRequest";
import { CategoryService } from "../services/categoryService";

export const useUpdateCategory = () => {
  return useMutation<
    SuccessResponse<CategoryResponse>,
    AxiosError<ErrorResponse>,
    CategoryRequest & { idCategory: number }
  >({
    mutationFn: ({ idCategory, ...request }) =>
      CategoryService.update(idCategory, request),
  });
};
