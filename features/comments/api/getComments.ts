import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Comment } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getComments = async ({
  discussionId,
}: {
  discussionId: string;
}): Promise<Comment[]> => {
  const response = await supabase
    .from<Comment>("comment")
    .select("*")
    .eq("discussionId", discussionId);

  return response.data ?? [];
};

type QueryFnType = typeof getComments;

type UseCommentsOptions = {
  discussionId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useComments = ({ discussionId, config }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["comments", discussionId],
    queryFn: () => getComments({ discussionId }),
    ...config,
  });
};
