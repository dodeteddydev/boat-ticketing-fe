import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatParams } from "../types/boatParams";
import { BoatResponse } from "../types/boatResponse";

export class BoatService {
  static async create(request: BoatService) {
    return axiosInstance
      .post<SuccessResponse<BoatResponse>>("/boat", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: BoatService) {
    return axiosInstance
      .put<SuccessResponse<BoatResponse>>(`/boat/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<BoatResponse>>(
        `/boat/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<BoatResponse>>(`/boat/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: BoatParams) {
    return axiosInstance
      .get<SuccessListResponse<BoatResponse[]>>("/boat", { params })
      .then((response) => response.data);
  }
}
