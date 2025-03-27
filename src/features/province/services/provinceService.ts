import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { ProvinceResponse } from "../types/provinceResponse";

export class ProvinceService {
  static async create(request: ProvinceService) {
    return axiosInstance
      .post<SuccessResponse<ProvinceResponse>>("/province", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: ProvinceService) {
    return axiosInstance
      .put<SuccessResponse<ProvinceResponse>>(`/province/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<ProvinceResponse>>(
        `/province/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<ProvinceResponse>>(`/province/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<ProvinceResponse[]>>("/province", { params })
      .then((response) => response.data);
  }
}
