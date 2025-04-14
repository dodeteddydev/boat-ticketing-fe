import { axiosInstance } from "../../../services/axiosInstance";
import { ActiveRequest } from "../../../types/activeRequest";
import { ListParams } from "../../../types/listParams";
import { SuccessListResponse } from "../../../types/successListResponse";
import { SuccessResponse } from "../../../types/successResponse";
import { CountryRequest } from "../types/countryRequest";
import { CountryResponse } from "../types/countryResponse";

export class CountryService {
  static async create(request: CountryRequest) {
    return axiosInstance
      .post<SuccessResponse<CountryResponse>>("/country", request)
      .then((response) => response.data);
  }

  static async update(id: number, request: CountryRequest) {
    return axiosInstance
      .put<SuccessResponse<CountryResponse>>(`/country/${id}`, request)
      .then((response) => response.data);
  }

  static async active(request: ActiveRequest) {
    return axiosInstance
      .patch<SuccessResponse<CountryResponse>>(
        `/country/${request.id}/active`,
        request
      )
      .then((response) => response.data);
  }

  static async delete(id: number) {
    return axiosInstance
      .delete<SuccessResponse<CountryResponse>>(`/country/${id}`)
      .then((response) => response.data);
  }

  static async get(params?: ListParams) {
    return axiosInstance
      .get<SuccessListResponse<CountryResponse[]>>("/country", { params })
      .then((response) => response.data);
  }
}
