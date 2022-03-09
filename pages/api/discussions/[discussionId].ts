import type { NextApiRequest, NextApiResponse } from "next";
import { Discussion } from "@/features/discussions";
import discussionsDB from "@/public/discussionsDB.json";

export default function returnAllDiscussions(
  req: NextApiRequest,
  res: NextApiResponse<Discussion | undefined>
) {
  const { discussionId } = req.query;
  res
    .status(200)
    .json(discussionsDB.find((discussion) => discussion.id === discussionId));
}
