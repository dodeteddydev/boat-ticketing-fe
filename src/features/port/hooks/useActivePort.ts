import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { PortResponse } from "../types/portResponse";
import { PortService } from "../services/portService";

export const useActivePort = () => {
  return useMutation<
    SuccessResponse<PortResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => PortService.active(request),
  });
};
