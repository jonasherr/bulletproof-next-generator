import { BaseEntity } from "@/types";

export type CommentsType = {
  body?: string;
  authorId?: number;
  discussionId?: number;
} & BaseEntity;
