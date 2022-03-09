import type { NextApiRequest, NextApiResponse } from "next";
import { RegisterCredentialsDTO, UserResponse } from "@/features/auth";
import usersDB from "@/public/usersDB.json";
import { writeJsonFileSync } from "write-json-file";
import { ROLES } from "@/lib/authorization";

export default function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { email, password, firstName, lastName } =
    req.body as RegisterCredentialsDTO;

  const user = {
    id: Math.random().toString(),
    email,
    firstName,
    lastName,
    bio: "Bioooo",
    role: ROLES.ADMIN,
  };

  writeJsonFileSync("./public/usersDB.json", [
    ...usersDB,
    { ...user, password },
  ]);

  res.status(200).json({ jwt: Math.random().toString(), user });
}
