import { useMutation } from "react-query";

import { useAuth } from "@/lib/auth";
import { MutationConfig } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";
import { supabase } from "@/lib/initSupabase";
import { User } from "@/features/users";

export type UpdateProfileDTO = {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
  };
};

export const updateProfile = async ({ data }: UpdateProfileDTO) => {
  const userResponse = await supabase.auth.user();

  if (userResponse === null) throw Error();

  const { error, data: user } = await supabase
    .from<User>("users")
    .update(data)
    .eq("email", userResponse.email as string);

  if (error !== null) throw Error();

  if (userResponse.email !== data.email) {
    const { error: emailError } = await supabase.auth.api.updateUserById(
      userResponse.id,
      {
        email: data.email,
      }
    );

    if (emailError !== null) throw Error;
  }
  return user;
};

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "User Updated",
      });
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
