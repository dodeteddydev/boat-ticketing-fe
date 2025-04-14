import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ScheduleService } from "../services/scheduleService";
import { ScheduleResponse } from "../types/scheduleResponse";

export const useDeleteSchedule = () => {
  return useMutation<
    SuccessResponse<ScheduleResponse>,
    AxiosError<ErrorResponse>,
    { idSchedule: number }
  >({
    mutationFn: ({ idSchedule }) => ScheduleService.delete(idSchedule),
  });
};
