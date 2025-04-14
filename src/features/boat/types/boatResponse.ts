import { CreatedByResponse } from "../../../types/createdByResponse";

export type BoatResponse = {
  id: number;
  boatName: string;
  boatCode: string;
  category: {
    id: number;
    categoryName: string;
    categoryCode: string;
  };
  image: string | null;
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
