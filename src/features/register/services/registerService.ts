import { axiosInstance } from "../../../services/axiosInstance";
import { SuccessResponse } from "../../../types/successResponse";
import { RegisterRequest } from "../types/registerRequest";
import { RegisterResponse } from "../types/registerResponse";

export class RegisterService {
  static async register(request: RegisterRequest) {
    return axiosInstance
      .post<SuccessResponse<RegisterResponse>>("/auth/register", request)
      .then((response) => response.data);
  }
}
