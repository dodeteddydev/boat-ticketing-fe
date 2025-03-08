import { axiosInstance } from "../../../services/axiosInstance";
import { SuccessResponse } from "../../../types/successResponse";
import { ProfileResponseType } from "../types/profileResponseType";

export class DashboardService {
  static async getProfile() {
    return axiosInstance
      .get<SuccessResponse<ProfileResponseType>>("/user/profile")
      .then((response) => response.data);
  }
}
