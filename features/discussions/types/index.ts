import { BaseEntity } from "@/types";

export type Discussion = {
  title: string;
  body: string;
} & BaseEntity;
