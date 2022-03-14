import { initReactQueryAuth } from "react-query-auth";

import { Spinner } from "@/components/Elements";
import {
  AuthUser,
  getUser,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
} from "@/features/auth";
import { supabase } from "@/lib/initSupabase";

async function loadUser() {
  return await getUser();
}

async function loginFn(data: LoginCredentialsDTO) {
  return await loginWithEmailAndPassword(data);
}

async function registerFn(data: RegisterCredentialsDTO) {
  return await registerWithEmailAndPassword(data);
}

async function logoutFn() {
  window.location.assign(window.location.origin as unknown as string);
  await supabase.auth.signOut();
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
