import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { DiscussionsType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getDiscussions = async (): Promise<DiscussionsType[]> => {
  const response = await supabase
    .from<DiscussionsType>("discussions")
    .select("*");

  return response.data ?? [];
};

type QueryFnType = typeof getDiscussions;

type UseDiscussionsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDiscussions = ({ config }: UseDiscussionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["discussions"],
    queryFn: () => getDiscussions(),
  });
};
