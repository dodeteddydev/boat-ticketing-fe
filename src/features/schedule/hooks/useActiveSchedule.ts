import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ActiveRequest } from "../../../types/activeRequest";
import { ErrorResponse } from "../../../types/errorResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ScheduleResponse } from "../types/scheduleResponse";
import { ScheduleService } from "../services/scheduleService";

export const useActiveSchedule = () => {
  return useMutation<
    SuccessResponse<ScheduleResponse>,
    AxiosError<ErrorResponse>,
    ActiveRequest
  >({
    mutationFn: (request) => ScheduleService.active(request),
  });
};
