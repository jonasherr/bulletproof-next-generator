import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { TubaType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getTuba = async ({
  tubaId,
}: {
  tubaId: string;
}): Promise<TubaType | undefined> => {
  const { data: tuba } = await supabase
    .from<TubaType>("tuba")
    .select()
    .eq("id", tubaId);

  if (tuba === null) throw Error();

  return tuba[0];
};

type QueryFnType = typeof getTuba;

type UseTubaOptions = {
  tubaId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTuba = ({
  tubaId,
  config,
}: UseTubaOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["tuba", tubaId],
    queryFn: () => getTuba({ tubaId }),
  });
};
