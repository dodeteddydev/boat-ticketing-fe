import { axiosInstance } from "../../../services/axiosInstance";
import { SuccessResponse } from "../../../types/successResponse";
import { LoginRequest } from "../types/loginRequest";
import { LoginResponse } from "../types/loginResponse";

export class LoginService {
  static async login(request: LoginRequest) {
    return axiosInstance
      .post<SuccessResponse<LoginResponse>>("/auth/login", request)
      .then((response) => response.data);
  }
}
