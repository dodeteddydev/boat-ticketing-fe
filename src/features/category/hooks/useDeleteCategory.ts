import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CategoryService } from "../services/categoryService";
import { CategoryResponse } from "../types/categoryResponse";

export const useDeleteCategory = () => {
  return useMutation<
    SuccessResponse<CategoryResponse>,
    AxiosError<ErrorResponse>,
    { idCategory: number }
  >({
    mutationFn: ({ idCategory }) => CategoryService.delete(idCategory),
  });
};
