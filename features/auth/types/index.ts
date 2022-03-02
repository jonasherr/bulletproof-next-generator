import { ROLES } from "@/lib/authorization";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: ROLES;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
