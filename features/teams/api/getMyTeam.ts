import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Team } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getMyTeam = async (): Promise<Team> => {
  const teamId = 1;
  const { data: team } = await supabase
    .from<Team>("team")
    .select()
    .eq("id", teamId);

  if (team === null) throw Error();

  return team[0];
};

type QueryFnType = typeof getMyTeam;

type UseMyTeamOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMyTeam = ({ config }: UseMyTeamOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["my-teams"],
    queryFn: () => getMyTeam(),
  });
};
