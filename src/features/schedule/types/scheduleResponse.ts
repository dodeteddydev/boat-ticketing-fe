import { CreatedByResponse } from "../../../types/createdByResponse";

export type ScheduleResponse = {
  id: number;
  schedule: string;
  seat: number;
  price: number;
  markupPrice: number;
  boat: {
    id: number;
    boatName: string;
    boatCode: string;
  };
  arrival: {
    id: number;
    portName: string;
    portCode: string;
  };
  departure: {
    id: number;
    portName: string;
    portCode: string;
  };
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
