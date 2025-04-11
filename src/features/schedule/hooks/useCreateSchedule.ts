import { useMutation } from "@tanstack/react-query";
import { SuccessResponse } from "../../../types/successResponse";
import { ScheduleResponse } from "../types/scheduleResponse";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types/errorResponse";
import { ScheduleRequest } from "../types/scheduleRequest";
import { ScheduleService } from "../services/scheduleService";

export const useCreateSchedule = () => {
  return useMutation<
    SuccessResponse<ScheduleResponse>,
    AxiosError<ErrorResponse>,
    ScheduleRequest
  >({
    mutationFn: (request) => ScheduleService.create(request),
  });
};
