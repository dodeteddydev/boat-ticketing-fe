import { useMutation } from "@tanstack/react-query";
import { RegisterService } from "../services/registerService";
import { SuccessResponse } from "../../../types/successResponse";
import { RegisterResponse } from "../types/registerResponse";
import { ErrorResponse } from "../../../types/errorResponse";
import { RegisterRequest } from "../types/registerRequest";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<
    SuccessResponse<RegisterResponse>,
    AxiosError<ErrorResponse>,
    RegisterRequest
  >({
    mutationFn: (request) => RegisterService.register(request),
  });
};
