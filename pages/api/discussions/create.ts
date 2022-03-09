import type { NextApiRequest, NextApiResponse } from "next";
import discussionsDB from "@/public/discussionsDB.json";
import { writeJsonFileSync } from "write-json-file";
import { Discussion } from "@/features/discussions";

// TODO: TeamID needs to be read from current user

export default function createDiscussion(
  req: NextApiRequest,
  res: NextApiResponse<Discussion>
) {
  const { title, body } = req.body as { title: string; body: string };

  const discussion = {
    id: Math.random().toString(),
    title,
    body,
    teamId: "123",
    createdAt: new Date().getTime(),
  };

  writeJsonFileSync("./public/discussionsDB.json", [
    ...discussionsDB,
    discussion,
  ]);

  res.status(200).json(discussion);
}
