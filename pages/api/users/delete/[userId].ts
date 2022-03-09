import type { NextApiRequest, NextApiResponse } from "next";
import usersDB from "@/public/usersDB.json";
import { writeJsonFileSync } from "write-json-file";

export default function deleteDiscussion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  writeJsonFileSync(
    "./public/usersDB.json",
    usersDB.filter((user) => user.id !== userId)
  );

  res.status(200);
}
