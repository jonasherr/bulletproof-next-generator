import { BaseEntity } from "@/types";

export type DiscussionsType = {
  title?: string;
  body?: string;
} & BaseEntity;
