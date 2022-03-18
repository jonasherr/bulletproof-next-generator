import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TubaType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type UpdateTubaDTO = {
  data: {
    title: string;
    body: string;
  };
  tubaId: string;
};

export const updateTuba = async ({
  data,
  tubaId,
}: UpdateTubaDTO): Promise<TubaType> => {
  const { data: updatedTuba } = await supabase
    .from<TubaType>("tuba")
    .update(data)
    .match({ id: tubaId });

  if (updatedTuba === null) throw Error();

  return updatedTuba[0];
};

type UseUpdateTubaOptions = {
  config?: MutationConfig<typeof updateTuba>;
};

export const useUpdateTuba = ({
  config,
}: UseUpdateTubaOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingTuba: any) => {
      await queryClient.cancelQueries([
        "tuba",
        updatingTuba?.tubaId,
      ]);

      const previousTuba = queryClient.getQueryData<TubaType>([
        "tuba",
        updatingTuba?.tubaId,
      ]);

      queryClient.setQueryData(
        ["tuba", updatingTuba?.tubaId],
        {
          ...previousTuba,
          ...updatingTuba.data,
          id: updatingTuba.tubaId,
        }
      );

      return { previousTuba };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTuba) {
        queryClient.setQueryData(
          ["tuba", context.previousTuba.id],
          context.previousTuba
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["tuba", data.id]);
      addNotification({
        type: "success",
        title: "Tuba Updated",
      });
    },
    ...config,
    mutationFn: updateTuba,
  });
};
