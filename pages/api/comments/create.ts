import type { NextApiRequest, NextApiResponse } from "next";
import commentsDB from "@/public/commentsDB.json";
import { writeJsonFileSync } from "write-json-file";
import { Comment } from "@/features/comments";

// TODO: authorId needs to be read from current user

// TODO: error should be thrown if discussionID does not exist

export default function createDiscussion(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  const { body, discussionId } = req.body;

  const comment = {
    id: Math.random().toString(),
    createdAt: new Date().getTime(),
    body,
    discussionId,
    authorId: "0.9925694995212515",
  };

  writeJsonFileSync("./public/commentsDB.json", [...commentsDB, comment]);

  res.status(200).json(comment);
}
