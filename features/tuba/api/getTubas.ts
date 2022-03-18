import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TubaType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getTubas = async (): Promise<TubaType[]> => {
  const response = await supabase.from<TubaType>("tuba").select("*");

  return response.data ?? [];
};

type QueryFnType = typeof getTubas;

type UseTubasOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTubas = ({ config }: UseTubasOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["tubas"],
    queryFn: () => getTubas(),
  });
};
