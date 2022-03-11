import type { NextApiRequest, NextApiResponse } from "next";
import { LoginCredentialsDTO, UserResponse } from "@/features/auth";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | undefined>
) {
  try {
    const loginInput = req.body as LoginCredentialsDTO;

    const user = await prisma.users.findUnique({
      where: {
        email: loginInput.email,
      },
    });

    if (user === null) throw new Error();

    const passwordHash = crypto
      .createHash("sha256", "secret")
      .update(loginInput.password)
      .digest("hex");

    if (passwordHash !== user.password) throw new Error();

    const { id, email, firstName, lastName, bio, role } = user;

    const userDTO = { id, email, firstName, lastName, bio, role };

    res.status(200).json({ jwt: Math.random().toString(), user: userDTO });
  } catch {
    res.status(500).json(undefined);
  }
}
