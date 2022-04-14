import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TestType } from "../types";
import { supabase } from "@/lib/initSupabase";

export const deleteTest = async ({
  testId,
}: {
  testId: number;
}) => {
  const { data, error } = await supabase
    .from<TestType>("test")
    .delete()
    .match({ id: testId });

  if (error !== null) throw Error();

  return data;
};

type UseDeleteTestOptions = {
  config?: MutationConfig<typeof deleteTest>;
};

export const useDeleteTest = ({
  config,
}: UseDeleteTestOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedTest) => {
      await queryClient.cancelQueries("tests");

      const previousTests =
        queryClient.getQueryData<TestType[]>("tests");

      queryClient.setQueryData(
        "tests",
        previousTests?.filter(
          (test) => test.id !== deletedTest.testId
        )
      );

      return { previousTests };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTests) {
        queryClient.setQueryData("tests", context.previousTests);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tests");
      addNotification({
        type: "success",
        title: "Test Deleted",
      });
    },
    ...config,
    mutationFn: deleteTest,
  });
};
