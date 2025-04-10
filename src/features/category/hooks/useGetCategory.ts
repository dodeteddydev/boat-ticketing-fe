import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { CategoryResponse } from "../types/categoryResponse";
import { CategoryService } from "../services/categoryService";
import { ListParams } from "../../../types/listParams";

export const useGetCategory = (enabled = true, params?: ListParams) => {
  return useQuery<
    SuccessListResponse<CategoryResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["category", params],
    queryFn: () => CategoryService.get(params),
    enabled,
  });
};
