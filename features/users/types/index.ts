import { BaseEntity } from "@/types";

export type UsersType = {
  firstName: string, 
  lastName: string, 
  role: string, 
  bio?: string, 
  email: string, 
} & BaseEntity;
