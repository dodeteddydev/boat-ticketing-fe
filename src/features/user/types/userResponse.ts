import { CreatedByResponse } from "../../../types/createdByResponse";

export type UserResponse = {
  id: number;
  role: string;
  name: string;
  username: string;
  email: string;
  status: string;
  createdBy: CreatedByResponse;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
