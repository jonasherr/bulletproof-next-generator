import type { NextApiRequest, NextApiResponse } from "next";
import { RegisterCredentialsDTO, UserResponse } from "@/features/auth";
import { ROLES } from "@/lib/authorization";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const crypto = require("crypto");

const prisma = new PrismaClient();

export default async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { email, password, firstName, lastName } =
    req.body as RegisterCredentialsDTO;

  const user = await prisma.users.create({
    data: {
      id: uuid(),
      email,
      firstName,
      lastName,
      bio: "Bioooo",
      role: ROLES.ADMIN,
      password: crypto
        .createHash("sha256", "secret")
        .update(password)
        .digest("hex"),
    },
  });

  res.status(200).json({ jwt: Math.random().toString(), user });
}
