import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ScheduleRequest } from "../types/scheduleRequest";
import { ScheduleResponse } from "../types/scheduleResponse";

export class ScheduleService {
  static async create(request: ScheduleRequest) {
    return axiosInstance
      .post<SuccessResponse<ScheduleResponse>>("/schedule", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: ScheduleRequest) {
    return axiosInstance
      .put<SuccessResponse<ScheduleResponse>>(`/schedule/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<ScheduleResponse>>(
        `/schedule/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<ScheduleResponse>>(`/schedule/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<ScheduleResponse[]>>("/schedule", { params })
      .then((response) => response.data);
  }
}
