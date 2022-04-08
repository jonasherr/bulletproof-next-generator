import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { DiscussionsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type CreateDiscussionDTO = {
  data: {
    title: string;
    body: string;
  };
};

export const createDiscussion = async ({
  data,
}: CreateDiscussionDTO): Promise<DiscussionsType> => {
  const { data: createdDiscussion } = await supabase
    .from<DiscussionsType>("discussions")
    .insert([data]);

  if (createdDiscussion === null) throw Error();

  return createdDiscussion[0];
};

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createDiscussion>;
};

export const useCreateDiscussion = ({
  config,
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newDiscussion) => {
      await queryClient.cancelQueries("discussions");

      const previousDiscussions =
        queryClient.getQueryData<DiscussionsType[]>("discussions");

      queryClient.setQueryData("discussions", [
        ...(previousDiscussions || []),
        newDiscussion.data,
      ]);

      return { previousDiscussions };
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData("discussions", context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("discussions");
      addNotification({
        type: "success",
        title: "Discussion Created",
      });
    },
    ...config,
    mutationFn: createDiscussion,
  });
};
