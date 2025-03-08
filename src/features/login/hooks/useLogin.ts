import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { LoginService } from "../services/loginService";
import { LoginResponse } from "../types/loginResponse";
import { ErrorResponse } from "../../../types/errorResponse";
import { LoginRequest } from "../types/loginRequest";
import { AxiosError } from "axios";

export const useLogin = () => {
  return useMutation<
    SuccessResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginRequest
  >({
    mutationFn: (request) => LoginService.login(request),
  });
};
