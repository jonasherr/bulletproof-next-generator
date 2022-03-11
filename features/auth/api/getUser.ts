import { AuthUser } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getUser = async (): Promise<AuthUser> => {
  const user = supabase.auth.user();

  if (user === null || user.email === undefined) throw Error();

  const { data: userData } = await supabase
    .from<AuthUser>("users")
    .select()
    .eq("email", user.email);

  if (userData === null) throw Error();

  return userData[0];
};
