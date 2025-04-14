import { ListParams } from "../../../types/listParams";

export type ScheduleParams = Omit<ListParams, "search"> & {
  schedule?: string;
  boatId?: number;
  arrivalId?: number;
  departureId?: number;
};
