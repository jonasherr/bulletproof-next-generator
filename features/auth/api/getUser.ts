import { AuthUser } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getUser = async (): Promise<AuthUser | null> => {
  const user = supabase.auth.user();

  if (user === null || user.email === undefined) return null;

  const { data: userData } = await supabase
    .from<AuthUser>("users")
    .select()
    .eq("email", user.email);

  if (userData === null) return null;

  return userData[0];
};
