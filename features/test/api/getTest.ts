import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TestType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getTest = async ({
  testId,
}: {
  testId: number;
}): Promise<TestType | undefined> => {
  const { data: test } = await supabase
    .from<TestType>("test")
    .select()
    .eq("id", testId);

  if (test === null) throw Error();

  return test[0];
};

type QueryFnType = typeof getTest;

type UseTestOptions = {
  testId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useTest = ({
  testId,
  config,
}: UseTestOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["test", testId],
    queryFn: () => getTest({ testId }),
  });
};
