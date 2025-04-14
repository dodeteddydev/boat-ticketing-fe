import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { UserRequest } from "../types/userRequest";
import { UserResponse } from "../types/userResponse";

export class UserService {
  static async create(request: UserRequest) {
    return axiosInstance
      .post<SuccessResponse<UserResponse>>("/user", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: UserRequest) {
    return axiosInstance
      .put<SuccessResponse<UserResponse>>(`/user/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<UserResponse>>(
        `/user/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<UserResponse>>(`/user/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<UserResponse[]>>("/user", { params })
      .then((response) => response.data);
  }
}
