import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/initSupabase";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (typeof userId !== "string") return res.status(500);

  const { error } = await supabase.auth.api.deleteUser(userId);

  if (error !== null) res.status(500);

  res.status(200);
}
