import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { UserService } from "../services/userService";
import { UserResponse } from "../types/userResponse";

export const useDeleteUser = () => {
  return useMutation<
    SuccessResponse<UserResponse>,
    AxiosError<ErrorResponse>,
    { idUser: number }
  >({
    mutationFn: ({ idUser }) => UserService.delete(idUser),
  });
};
