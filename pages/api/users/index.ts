import type { NextApiRequest, NextApiResponse } from "next";
import usersDB from "@/public/usersDB.json";
import { User } from "@/features/users";

export default function returnAllUsers(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(usersDB);
}
