import type { NextApiRequest, NextApiResponse } from "next";
import discussionsDB from "@/public/discussionsDB.json";
import { writeJsonFileSync } from "write-json-file";
import { Discussion } from "@/features/discussions";

export default function deleteDiscussion(
  req: NextApiRequest,
  res: NextApiResponse<Discussion>
) {
  const { discussionId } = req.query as { discussionId: string };

  const { title, body } = req.body;

  if (
    discussionsDB.findIndex((discussion) => discussion.id === discussionId) ===
    -1
  )
    return res.status(500);

  const newDiscussionData = {
    ...discussionsDB.find((discussion) => discussion.id === discussionId),
    title,
    body,
  } as Discussion;

  writeJsonFileSync("./public/discussionsDB.json", [
    ...discussionsDB.filter((discussion) => discussion.id !== discussionId),
    newDiscussionData,
  ]);

  res.status(200).json(newDiscussionData);
}
