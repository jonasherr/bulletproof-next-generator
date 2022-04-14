import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TestType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type UpdateTestDTO = {
  data: {
         id: number;
         createdAt: string;
         test: string;
         testNumber: number;
         mitLeerzeichen: string;
  };
  testId: number;
};

export const updateTest = async ({
  data,
  testId,
}: UpdateTestDTO): Promise<TestType> => {
  const { data: updatedTest } = await supabase
    .from<TestType>("test")
    .update(data)
    .match({ id: testId });

  if (updatedTest === null) throw Error();

  return updatedTest[0];
};

type UseUpdateTestOptions = {
  config?: MutationConfig<typeof updateTest>;
};

export const useUpdateTest = ({
  config,
}: UseUpdateTestOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingTest: any) => {
      await queryClient.cancelQueries([
        "test",
        updatingTest?.testId,
      ]);

      const previousTest = queryClient.getQueryData<TestType>([
        "test",
        updatingTest?.testId,
      ]);

      queryClient.setQueryData(
        ["test", updatingTest?.testId],
        {
          ...previousTest,
          ...updatingTest.data,
          id: updatingTest.testId,
        }
      );

      return { previousTest };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTest) {
        queryClient.setQueryData(
          ["test", context.previousTest.id],
          context.previousTest
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["test", data.id]);
      addNotification({
        type: "success",
        title: "Test Updated",
      });
    },
    ...config,
    mutationFn: updateTest,
  });
};
