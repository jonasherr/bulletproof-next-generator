import type { NextApiRequest, NextApiResponse } from "next";
import { LoginCredentialsDTO, UserResponse } from "@/features/auth";
import usersDB from "@/public/usersDB.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | undefined>
) {
  try {
    const loginInput = req.body as LoginCredentialsDTO;

    const user = usersDB.find(
      (singleUser) =>
        singleUser.email === loginInput.email &&
        singleUser.password === loginInput.password
    );

    if (user === undefined) throw new Error();

    const { id, email, firstName, lastName, bio, role } = user;

    const userDTO = { id, email, firstName, lastName, bio, role };

    res.status(200).json({ jwt: Math.random().toString(), user: userDTO });
  } catch {
    res.status(500).json(undefined);
  }
}
