import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { DiscussionsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getDiscussion = async ({
  discussionId,
}: {
  discussionId: string;
}): Promise<DiscussionsType | undefined> => {
  const { data: discussion } = await supabase
    .from<DiscussionsType>("discussions")
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
