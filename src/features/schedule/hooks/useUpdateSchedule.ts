import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { ScheduleResponse } from "../types/scheduleResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { ScheduleRequest } from "../types/scheduleRequest";
import { ScheduleService } from "../services/scheduleService";

export const useUpdateSchedule = () => {
  return useMutation<
    SuccessResponse<ScheduleResponse>,
    AxiosError<ErrorResponse>,
    ScheduleRequest & { idSchedule: number }
  >({
    mutationFn: ({ idSchedule, ...request }) =>
      ScheduleService.update(idSchedule, request),
  });
};
