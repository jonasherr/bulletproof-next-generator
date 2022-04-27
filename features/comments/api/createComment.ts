import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { CommentsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type CreateCommentDTO = {
  data: {
    body: string;
    discussionId: number;
  };
};

export const createComment = async ({
  data,
}: CreateCommentDTO): Promise<CommentsType> => {
  const { data: createdComment } = await supabase
    .from<CommentsType>("comments")
    .insert([data]);

  if (createdComment === null) throw Error();

  return createdComment[0];
};

type UseCreateCommentOptions = {
  discussionId: number;
  config?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({
  config,
  discussionId,
}: UseCreateCommentOptions) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["comments", discussionId]);

      const previousComments = queryClient.getQueryData<CommentsType[]>([
        "comments",
        discussionId,
      ]);

      queryClient.setQueryData(
        ["comments", discussionId],
        [...(previousComments || []), newComment.data]
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
        title: "Comment Created",
      });
    },
    ...config,
    mutationFn: createComment,
  });
};
