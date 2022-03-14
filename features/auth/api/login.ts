import { AuthUser } from "../types";
import { supabase } from "@/lib/initSupabase";
import { useNotificationStore } from "@/stores/notifications";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<AuthUser> => {
  try {
    const { error } = await supabase.auth.signIn(data);

    if (error !== null) throw Error();

    const session = supabase.auth.session();

    if (session === null) throw Error();

    const { data: userData } = await supabase
      .from<AuthUser>("users")
      .select()
      .eq("email", data.email);

    if (userData === null) throw Error();

    return userData[0];
  } catch {
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Invalid credentials",
      message: "Please make sure to enter valid credentials.",
    });
    return Promise.reject("Invalid credentials");
  }
};
