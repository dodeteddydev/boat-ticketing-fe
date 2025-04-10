import { ListParams } from "../../../types/listParams";

export type PortParams = ListParams & {
  countryId?: number;
  provinceId?: number;
  cityId?: number;
};
