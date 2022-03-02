import { initReactQueryAuth } from "react-query-auth";

import { Spinner } from "@/components/Elements";
import {
  AuthUser,
  getUser,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  UserResponse,
} from "@/features/auth";
import storage from "@/utils/storage";

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    return await getUser();
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
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
