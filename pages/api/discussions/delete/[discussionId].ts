import type { NextApiRequest, NextApiResponse } from "next";
import discussionsDB from "@/public/discussionsDB.json";
import { writeJsonFileSync } from "write-json-file";

export default function deleteDiscussion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { discussionId } = req.query as { discussionId: string };

  writeJsonFileSync(
    "./public/discussionsDB.json",
    discussionsDB.filter((discussion) => discussion.id !== discussionId)
  );

  res.status(200);
}
