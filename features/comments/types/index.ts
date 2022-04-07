import { BaseEntity } from "@/types";

export type Comment = {
  body: string;
  authorId: number;
  discussionId: number;
} & BaseEntity;
