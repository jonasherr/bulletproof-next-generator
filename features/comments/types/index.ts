import { BaseEntity } from "@/types";

export type CommentsType = {
  body: string;
  discussionId: number;
} & BaseEntity;
