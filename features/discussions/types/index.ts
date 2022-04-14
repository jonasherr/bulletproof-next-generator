import { BaseEntity } from "@/types";

export type DiscussionsType = {
  title?: string, 
  body?: string, 
  teamId?: string, 
} & BaseEntity;
