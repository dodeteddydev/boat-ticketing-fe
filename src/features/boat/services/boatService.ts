import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { BoatParams } from "../types/boatParams";
import { BoatRequest } from "../types/boatRequest";
import { BoatResponse } from "../types/boatResponse";

export class BoatService {
  static async create(request: BoatRequest) {
    const formData = new FormData();
    formData.append("boatName", request.boatName);
    formData.append("boatCode", request.boatCode);
    formData.append("categoryId", request.categoryId.toString());
    if (request.image) {
      formData.append("image", request.image as File);
    }
    return axiosInstance
      .post<SuccessResponse<BoatResponse>>("/boat", formData)
      .then((response) => response.data);
  }

  static async update(id: number, request: BoatRequest) {
    const formData = new FormData();
    formData.append("boatName", request.boatName);
    formData.append("boatCode", request.boatCode);
    formData.append("categoryId", request.categoryId.toString());
    if (request.image) {
      formData.append("image", request.image as File);
    }
    return axiosInstance
      .put<SuccessResponse<BoatResponse>>(`/boat/${id}`, formData)
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
