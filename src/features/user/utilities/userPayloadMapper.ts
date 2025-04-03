import { User } from "../schemas/userSchema";
import { UserResponse } from "../types/userResponse";

export const userPayloadMapper = (user: UserResponse): User => {
  return {
    role: user.role,
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
  };
};
