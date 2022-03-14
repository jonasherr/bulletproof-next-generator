import { AuthUser } from "../types";
import { supabase } from "@/lib/initSupabase";
import { ROLES } from "@/lib/authorization";
import { useNotificationStore } from "@/stores/notifications";

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<AuthUser> => {
  try {
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
      },
    ]);

    if (user === null) throw Error();

    return user[0];
  } catch {
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Random error occurred",
      message: "Please try again",
    });
    return Promise.reject("Random error occurred");
  }
};
