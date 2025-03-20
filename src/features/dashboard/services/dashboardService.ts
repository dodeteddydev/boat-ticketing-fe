import { axiosInstance } from "../../../services/axiosInstance";
import { SuccessResponse } from "../../../types/successResponse";
import { ProfileResponse } from "../types/profileResponse";

export class DashboardService {
  static async getProfile() {
    return axiosInstance
      .get<SuccessResponse<ProfileResponse>>("/user/profile")
      .then((response) => response.data);
  }
}
