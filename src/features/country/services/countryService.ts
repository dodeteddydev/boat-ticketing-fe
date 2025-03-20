import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CountryResponse } from "../types/countryResponse";

export class CountryService {
  static async create(request: CountryService) {
    return axiosInstance
      .post<SuccessResponse<CountryResponse>>("/country", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: CountryService) {
    return axiosInstance
      .put<SuccessResponse<CountryResponse>>(`/country/${id}`, request)
      .then((response) => response.data);
  }

  static async active(id: number, request: ActiveRequest) {
    return axiosInstance
      .put<SuccessResponse<CountryResponse>>(`/country/${id}`, request)
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<CountryResponse>>(`/country/${id}`)
      .then((response) => response.data);
  }

  static async get() {
    return axiosInstance
      .get<SuccessListResponse<CountryResponse[]>>("/country")
      .then((response) => response.data);
  }
}
