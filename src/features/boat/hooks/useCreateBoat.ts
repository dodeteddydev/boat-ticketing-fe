import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatResponse } from "../types/boatResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { BoatRequest } from "../types/boatRequest";
import { BoatService } from "../services/boatService";

export const useCreateBoat = () => {
  return useMutation<
    SuccessResponse<BoatResponse>,
    AxiosError<ErrorResponse>,
    BoatRequest
  >({
    mutationFn: (request) => BoatService.create(request),
  });
};
