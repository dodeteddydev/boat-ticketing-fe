import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CityResponse } from "../types/cityResponse";

export class CityService {
  static async create(request: CityService) {
    return axiosInstance
      .post<SuccessResponse<CityResponse>>("/city", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: CityService) {
    return axiosInstance
      .put<SuccessResponse<CityResponse>>(`/city/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<CityResponse>>(
        `/city/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<CityResponse>>(`/city/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<CityResponse[]>>("/city", { params })
      .then((response) => response.data);
  }
}
