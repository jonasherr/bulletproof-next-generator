import type { NextApiRequest, NextApiResponse } from "next";

export default async function redirectToLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.redirect(301, "/auth/login");
}
