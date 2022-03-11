import { AuthUser, UserResponse } from "../types";
import { supabase } from "@/lib/initSupabase";
import { ROLES } from "@/lib/authorization";

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  teamId?: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error !== null) throw Error();

  const { data: user } = await supabase.from<AuthUser>("users").insert([
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: ROLES.ADMIN,
      bio: "",
      teamId: data.teamId,
    },
  ]);

  if (user === null) throw Error();

  return { jwt: "123", user: user[0] };
};
