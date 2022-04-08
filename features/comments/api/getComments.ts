import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { CommentsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getComments = async ({
  discussionId,
}: {
  discussionId: number;
}): Promise<CommentsType[]> => {
  const response = await supabase
    .from<CommentsType>("comments")
    .select("*")
    .eq("discussionId", discussionId);

  return response.data ?? [];
};

type QueryFnType = typeof getComments;

type UseCommentsOptions = {
  discussionId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useComments = ({ discussionId, config }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["comments", discussionId],
    queryFn: () => getComments({ discussionId }),
    ...config,
  });
};
