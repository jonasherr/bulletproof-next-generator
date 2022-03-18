import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TubaType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const deleteTuba = async ({
  tubaId,
}: {
  tubaId: number;
}) => {
  const { data, error } = await supabase
    .from<TubaType>("tuba")
    .delete()
    .match({ id: tubaId });

  if (error !== null) throw Error();

  return data;
};

type UseDeleteTubaOptions = {
  config?: MutationConfig<typeof deleteTuba>;
};

export const useDeleteTuba = ({
  config,
}: UseDeleteTubaOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedTuba) => {
      await queryClient.cancelQueries("tubas");

      const previousTubas =
        queryClient.getQueryData<TubaType[]>("tubas");

      queryClient.setQueryData(
        "tubas",
        previousTubas?.filter(
          (tuba) => tuba.id !== deletedTuba.tubaId
        )
      );

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
        title: "Tuba Deleted",
      });
    },
    ...config,
    mutationFn: deleteTuba,
  });
};
