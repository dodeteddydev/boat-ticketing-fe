import { CreatedByResponse } from "../../../types/createdByResponse";

export type CityResponse = {
  id: number;
  cityName: string;
  country: {
    id: number;
    countryName: string;
    countryCode: string;
  };
  province: {
    id: number;
    provinceName: string;
    provinceCode: string;
  };

  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
