import { useMutation } from "react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { UsersType } from "../types";

export type DeleteUserDTO = {
  userId: number;
};

export const deleteUser = ({ userId }: DeleteUserDTO) => {
  return axios.delete(`/api/users/delete/${userId}`);
};

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries("users");

      const previousUsers = queryClient.getQueryData<UsersType[]>("users");

      queryClient.setQueryData(
        "users",
        previousUsers?.filter((user) => user.id !== deletedUser.userId)
      );

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData("users", context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      addNotification({
        type: "success",
        title: "User Deleted",
      });
    },
    ...config,
    mutationFn: deleteUser,
  });
};
