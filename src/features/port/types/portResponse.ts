import { CreatedByResponse } from "../../../types/createdByResponse";

export type PortResponse = {
  id: number;
  portName: string;
  portCode: string;
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
  city: {
    id: number;
    cityName: string;
  };
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
