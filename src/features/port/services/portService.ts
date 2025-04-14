import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { PortRequest } from "../types/portRequest";
import { PortResponse } from "../types/portResponse";

export class PortService {
  static async create(request: PortRequest) {
    return axiosInstance
      .post<SuccessResponse<PortResponse>>("/port", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: PortRequest) {
    return axiosInstance
      .put<SuccessResponse<PortResponse>>(`/port/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<PortResponse>>(
        `/port/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<PortResponse>>(`/port/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<PortResponse[]>>("/port", { params })
      .then((response) => response.data);
  }
}
