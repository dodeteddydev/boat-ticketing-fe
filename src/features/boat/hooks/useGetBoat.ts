import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { BoatResponse } from "../types/boatResponse";
import { BoatService } from "../services/boatService";
import { BoatParams } from "../types/boatParams";

export const useGetBoat = (enabled = true, params?: BoatParams) => {
  return useQuery<
    SuccessListResponse<BoatResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["boat", params],
    queryFn: () => BoatService.get(params),
    enabled,
  });
};
