import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Team } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getTeams = async (): Promise<Team[]> => {
  const response = await supabase.from<Team>("team").select("*");

  return response.data ?? [];
};

type QueryFnType = typeof getTeams;

type UseTeamsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTeams = ({ config = {} }: UseTeamsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  });
};
