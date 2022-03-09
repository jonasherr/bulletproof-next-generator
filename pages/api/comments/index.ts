import type { NextApiRequest, NextApiResponse } from "next";
import commentsDB from "@/public/commentsDB.json";
import { Comment } from "@/features/comments";

export default function returnAllDiscussions(
  req: NextApiRequest,
  res: NextApiResponse<Comment[]>
) {
  const { discussionId } = req.query;

  res
    .status(200)
    .json(
      commentsDB.filter((comment) => comment.discussionId === discussionId)
    );
}
