import { ROLES } from "@/lib/authorization";

export type AuthUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: ROLES;
};
