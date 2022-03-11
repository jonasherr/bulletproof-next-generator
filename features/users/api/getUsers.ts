import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { User } from "../types";
import { supabase } from "@/lib/initSupabase";

export const getUsers = async (): Promise<User[]> => {
  const response = await supabase.from<User>("user").select("*");

  return response.data ?? [];
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
