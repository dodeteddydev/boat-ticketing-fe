import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { UserResponse } from "../types/userResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { UserRequest } from "../types/userRequest";
import { UserService } from "../services/userService";

export const useCreateUser = () => {
  return useMutation<
    SuccessResponse<UserResponse>,
    AxiosError<ErrorResponse>,
    UserRequest
  >({
    mutationFn: (request) => UserService.create(request),
  });
};
