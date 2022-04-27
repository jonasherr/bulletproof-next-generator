import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { DiscussionsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type UpdateDiscussionDTO = {
  data: {
    title: string;
    body: string;
  };
  discussionId: number;
};

export const updateDiscussion = async ({
  data,
  discussionId,
}: UpdateDiscussionDTO): Promise<DiscussionsType> => {
  const { data: updatedDiscussion } = await supabase
    .from<DiscussionsType>("discussions")
    .update(data)
    .match({ id: discussionId });

  if (updatedDiscussion === null) throw Error();

  return updatedDiscussion[0];
};

type UseUpdateDiscussionOptions = {
  config?: MutationConfig<typeof updateDiscussion>;
};

export const useUpdateDiscussion = ({
  config,
}: UseUpdateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingDiscussion: any) => {
      await queryClient.cancelQueries([
        "discussion",
        updatingDiscussion?.discussionId,
      ]);

      const previousDiscussion = queryClient.getQueryData<DiscussionsType>([
        "discussion",
        updatingDiscussion?.discussionId,
      ]);

      queryClient.setQueryData(
        ["discussion", updatingDiscussion?.discussionId],
        {
          ...previousDiscussion,
          ...updatingDiscussion.data,
          id: updatingDiscussion.discussionId,
        }
      );

      return { previousDiscussion };
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussion) {
        queryClient.setQueryData(
          ["discussion", context.previousDiscussion.id],
          context.previousDiscussion
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["discussion", data.id]);
      addNotification({
        type: "success",
        title: "Discussion Updated",
      });
    },
    ...config,
    mutationFn: updateDiscussion,
  });
};
