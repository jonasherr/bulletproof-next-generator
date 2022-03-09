import type { NextApiRequest, NextApiResponse } from "next";
import commentsDB from "@/public/commentsDB.json";
import { writeJsonFileSync } from "write-json-file";

export default function deleteComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { commentId } = req.query as { commentId: string };

  writeJsonFileSync(
    "./public/commentsDB.json",
    commentsDB.filter((discussion) => discussion.id !== commentId)
  );

  res.status(200);
}
