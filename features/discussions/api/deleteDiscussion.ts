import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Discussion } from "../types";
import { supabase } from "@/lib/initSupabase";

export const deleteDiscussion = async ({
  discussionId,
}: {
  discussionId: number;
}) => {
  const { error: deleteCommentError } = await supabase
    .from<Comment>("comments")
    .delete()
    .match({ discussionId });

  if (deleteCommentError !== null) throw Error();

  const { data, error } = await supabase
    .from<Discussion>("discussions")
    .delete()
    .match({ id: discussionId });

  if (error !== null) throw Error();

  return data;
};

type UseDeleteDiscussionOptions = {
  config?: MutationConfig<typeof deleteDiscussion>;
};

export const useDeleteDiscussion = ({
  config,
}: UseDeleteDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedDiscussion) => {
      await queryClient.cancelQueries("discussions");

      const previousDiscussions =
        queryClient.getQueryData<Discussion[]>("discussions");

      queryClient.setQueryData(
        "discussions",
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussion.discussionId
        )
      );

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
        title: "Discussion Deleted",
      });
    },
    ...config,
    mutationFn: deleteDiscussion,
  });
};
