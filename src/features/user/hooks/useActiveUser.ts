import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { UserService } from "../services/userService";
import { UserResponse } from "../types/userResponse";

export const useActiveUser = () => {
  return useMutation<
    SuccessResponse<UserResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => UserService.active(request),
  });
};
