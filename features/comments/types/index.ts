import { BaseEntity } from "@/types";

export type CommentsType = {
  body?: string, 
  authorId?: string, 
  discussionId?: number, 
} & BaseEntity;
