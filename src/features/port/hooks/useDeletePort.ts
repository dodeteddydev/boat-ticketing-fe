import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { PortService } from "../services/portService";
import { PortResponse } from "../types/portResponse";

export const useDeletePort = () => {
  return useMutation<
    SuccessResponse<PortResponse>,
    AxiosError<ErrorResponse>,
    { idPort: number }
  >({
    mutationFn: ({ idPort }) => PortService.delete(idPort),
  });
};
