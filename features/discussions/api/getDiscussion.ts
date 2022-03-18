import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Discussion } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getDiscussion = async ({
  discussionId,
}: {
  discussionId: string;
}): Promise<Discussion | undefined> => {
  const { data: discussion } = await supabase
    .from<Discussion>("discussions")
    .select()
    .eq("id", discussionId);

  if (discussion === null) throw Error();

  return discussion[0];
};

type QueryFnType = typeof getDiscussion;

type UseDiscussionOptions = {
  discussionId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useDiscussion = ({
  discussionId,
  config,
}: UseDiscussionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["discussion", discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
};
