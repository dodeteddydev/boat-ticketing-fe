import { useQuery } from "@tanstack/react-query";
import { SuccessListResponse } from "../../../types/successListResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { ScheduleResponse } from "../types/scheduleResponse";
import { ScheduleService } from "../services/scheduleService";
import { ScheduleParams } from "../types/scheduleParams";

export const useGetSchedule = (enabled = true, params?: ScheduleParams) => {
  return useQuery<
    SuccessListResponse<ScheduleResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["schedule", params],
    queryFn: () => ScheduleService.get(params),
    enabled,
  });
};
