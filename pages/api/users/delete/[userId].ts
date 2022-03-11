import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/initSupabase";
import { User } from "@/features/users";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (typeof userId !== "string") return res.status(500);

  // TODO: cannot be used until https://github.com/supabase/supabase/issues/5726 is fixed
  const { error, user } = await supabase.auth.api.deleteUser(userId);

  console.log(error);

  if (error !== null) res.status(500);

  const { error: deletePublicUserDataError } = await supabase
    .from<User>("users")
    .delete()
    .match({ email: user?.email });

  console.log(deletePublicUserDataError);

  if (deletePublicUserDataError !== null) res.status(500);

  res.status(200);
}
