import { CreatedByResponse } from "../../../types/createdByResponse";

export type CategoryResponse = {
  id: number;
  categoryName: string;
  categoryCode: string;
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
