import { UserResponse } from "../types";
import { supabase } from "@/lib/initSupabase";
import { User } from "@/features/users";
import { ROLES } from "@/lib/authorization";

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error !== null) throw Error();

  const { data: user } = await supabase.from<User>("users").insert([
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: ROLES.ADMIN,
      teamId: "1",
      bio: "",
    },
  ]);

  if (user === null) throw Error();

  return { jwt: "123", user: user[0] };
};
