import { useMutation } from "react-query";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";

import { TestType } from "../types";
import { supabase } from "@/lib/initSupabase";

export type CreateTestDTO = {
  data: {
        id: number;
        createdAt: string;
        test: string;
        testNumber: number;
        mitLeerzeichen: string;
  };
};

export const createTest = async ({
  data,
}: CreateTestDTO): Promise<TestType> => {
  const { data: createdTest } = await supabase
    .from<TestType>("test")
    .insert([data]);

  if (createdTest === null) throw Error();

  return createdTest[0];
};

type UseCreateTestOptions = {
  config?: MutationConfig<typeof createTest>;
};

export const useCreateTest = ({
  config,
}: UseCreateTestOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newTest) => {
      await queryClient.cancelQueries("tests");

      const previousTests =
        queryClient.getQueryData<TestType[]>("tests");

      queryClient.setQueryData("tests", [
        ...(previousTests || []),
        newTest.data,
      ]);

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
        title: "Test Created",
      });
    },
    ...config,
    mutationFn: createTest,
  });
};