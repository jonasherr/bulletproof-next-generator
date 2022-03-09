// TODO: implement properly, at the moment it is just a quick fix

import type { NextApiRequest, NextApiResponse } from "next";
import { AuthUser } from "@/features/auth";
import usersDB from "@/public/usersDB.json";

export default function handleUserMeCall(
  req: NextApiRequest,
  res: NextApiResponse<AuthUser>
) {
  const { id, firstName, lastName, bio, email, role } = usersDB[0];
  const user = { id, firstName, lastName, bio, email, role } as AuthUser;

  res.status(200).json(user);
}
