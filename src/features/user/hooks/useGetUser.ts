import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { UserResponse } from "../types/userResponse";
import { UserService } from "../services/userService";
import { ListParams } from "../../../types/listParams";

export const useGetUser = (enabled = true, params?: ListParams) => {
  return useQuery<
    SuccessListResponse<UserResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["user", params],
    queryFn: () => UserService.get(params),
    enabled,
  });
};
