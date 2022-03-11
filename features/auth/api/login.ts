import { AuthUser, UserResponse } from "../types";
import { supabase } from "@/lib/initSupabase";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  const { error } = await supabase.auth.signIn(data);

  if (error !== null) throw Error();

  const session = supabase.auth.session();

  if (session === null) throw Error();

  const { data: userData } = await supabase
    .from<AuthUser>("users")
    .select()
    .eq("email", data.email);

  if (userData === null) throw Error();

  return { jwt: session.access_token, user: userData[0] };
};
