import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatService } from "../services/boatService";
import { BoatResponse } from "../types/boatResponse";

export const useActiveBoat = () => {
  return useMutation<
    SuccessResponse<BoatResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => BoatService.active(request),
  });
};
