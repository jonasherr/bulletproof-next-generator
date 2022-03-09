import type { NextApiRequest, NextApiResponse } from "next";
import { Discussion } from "@/features/discussions";
import discussionsDB from "@/public/discussionsDB.json";

export default function returnAllDiscussions(
  req: NextApiRequest,
  res: NextApiResponse<Discussion[]>
) {
  res.status(200).json(discussionsDB);
}
