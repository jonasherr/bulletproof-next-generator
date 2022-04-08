import { BaseEntity } from "@/types";

export type UsersType = {
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  teamId?: string;
  bio: string;
} & BaseEntity;
