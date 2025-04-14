import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CategoryRequest } from "../types/categoryRequest";
import { CategoryResponse } from "../types/categoryResponse";

export class CategoryService {
  static async create(request: CategoryRequest) {
    return axiosInstance
      .post<SuccessResponse<CategoryResponse>>("/category", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: CategoryRequest) {
    return axiosInstance
      .put<SuccessResponse<CategoryResponse>>(`/category/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<CategoryResponse>>(
        `/category/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<CategoryResponse>>(`/category/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<CategoryResponse[]>>("/category", { params })
      .then((response) => response.data);
  }
}
