import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { CommentsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  const { data } = await supabase
    .from<CommentsType>("comments")
    .delete()
    .match({ id: commentId });

  return data;
};

type UseDeleteCommentOptions = {
  discussionId: number;
  config?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
  config,
  discussionId,
}: UseDeleteCommentOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedComment) => {
      await queryClient.cancelQueries(["comments", discussionId]);

      const previousComments = queryClient.getQueryData<CommentsType[]>([
        "comments",
        discussionId,
      ]);

      queryClient.setQueryData(
        ["comments", discussionId],
        previousComments?.filter(
          (comment) => comment.id !== deletedComment.commentId
        )
      );

      return { previousComments };
    },
    onError: (_, __, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", discussionId],
          context.previousComments
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", discussionId]);
      addNotification({
        type: "success",
        title: "Comment Deleted",
      });
    },
    ...config,
    mutationFn: deleteComment,
  });
};
