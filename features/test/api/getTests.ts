import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TestType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getTests = async (): Promise<TestType[]> => {
  const response = await supabase.from<TestType>("test").select("*");

  return response.data ?? [];
};

type QueryFnType = typeof getTests;

type UseTestsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTests = ({ config }: UseTestsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["tests"],
    queryFn: () => getTests(),
  });
};
