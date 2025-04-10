import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatService } from "../services/boatService";
import { BoatResponse } from "../types/boatResponse";

export const useDeleteBoat = () => {
  return useMutation<
    SuccessResponse<BoatResponse>,
    AxiosError<ErrorResponse>,
    { idBoat: number }
  >({
    mutationFn: ({ idBoat }) => BoatService.delete(idBoat),
  });
};
