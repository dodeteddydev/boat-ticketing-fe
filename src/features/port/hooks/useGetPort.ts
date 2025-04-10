import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { PortResponse } from "../types/portResponse";
import { PortService } from "../services/portService";
import { PortParams } from "../types/portParams";

export const useGetPort = (enabled = true, params?: PortParams) => {
  return useQuery<
    SuccessListResponse<PortResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["port", params],
    queryFn: () => PortService.get(params),
    enabled,
  });
};
