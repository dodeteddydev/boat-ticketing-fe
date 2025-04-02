import { ListParams } from "../../../types/listParams";

export type CityParams = ListParams & {
  countryId?: number;
  provinceId?: number;
};
