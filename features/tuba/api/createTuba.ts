import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TubaType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type CreateTubaDTO = {
  data: {
    title: string;
    body: string;
  };
};

export const createTuba = async ({
  data,
}: CreateTubaDTO): Promise<TubaType> => {
  const { data: createdTuba } = await supabase
    .from<TubaType>("tuba")
    .insert([data]);

  if (createdTuba === null) throw Error();

  return createdTuba[0];
};

type UseCreateTubaOptions = {
  config?: MutationConfig<typeof createTuba>;
};

export const useCreateTuba = ({
  config,
}: UseCreateTubaOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newTuba) => {
      await queryClient.cancelQueries("tubas");

      const previousTubas =
        queryClient.getQueryData<TubaType[]>("tubas");

      queryClient.setQueryData("tubas", [
        ...(previousTubas || []),
        newTuba.data,
      ]);

      return { previousTubas };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTubas) {
        queryClient.setQueryData("tubas", context.previousTubas);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tubas");
      addNotification({
        type: "success",
        title: "Tuba Created",
      });
    },
    ...config,
    mutationFn: createTuba,
  });
};