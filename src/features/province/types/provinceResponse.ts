import { CreatedByResponse } from "../../../types/createdByResponse";

export type ProvinceResponse = {
  id: number;
  provinceName: string;
  provinceCode: string;
  country: {
    id: number;
    countryName: string;
    countryCode: string;
  };
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
