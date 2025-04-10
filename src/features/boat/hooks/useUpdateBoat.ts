import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatResponse } from "../types/boatResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { BoatRequest } from "../types/boatRequest";
import { BoatService } from "../services/boatService";

export const useUpdateBoat = () => {
  return useMutation<
    SuccessResponse<BoatResponse>,
    AxiosError<ErrorResponse>,
    BoatRequest & { idBoat: number }
  >({
    mutationFn: ({ idBoat, ...request }) => BoatService.update(idBoat, request),
  });
};
