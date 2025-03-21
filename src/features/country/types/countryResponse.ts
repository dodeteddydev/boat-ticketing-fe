import { CreatedByResponse } from "../../../types/createdByResponse";

export type CountryResponse = {
  id: number;
  countryName: string;
  countryCode: string;
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
