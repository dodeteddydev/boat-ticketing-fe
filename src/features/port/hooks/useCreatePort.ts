import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { PortResponse } from "../types/portResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { PortRequest } from "../types/portRequest";
import { PortService } from "../services/portService";

export const useCreatePort = () => {
  return useMutation<
    SuccessResponse<PortResponse>,
    AxiosError<ErrorResponse>,
    PortRequest
  >({
    mutationFn: (request) => PortService.create(request),
  });
};
