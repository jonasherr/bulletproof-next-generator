import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { Comment } from "../types";
import { supabase } from "@/lib/initSupabase";

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await supabase
    .from<Comment>("comment")
    .delete()
    .match({ id: commentId });

  return data;
};

type UseDeleteCommentOptions = {
  discussionId: string;
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

      const previousComments = queryClient.getQueryData<Comment[]>([
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
