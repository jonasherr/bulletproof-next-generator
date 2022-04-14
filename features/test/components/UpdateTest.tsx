import { PencilIcon } from "@heroicons/react/solid";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { useTest } from "../api/getTest";
import { UpdateTestDTO, useUpdateTest } from "../api/updateTest";

type UpdateTestProps = {
  testId: number;
};

const schema = z.object({
  id: z.number().min(1, "Required"),
  createdAt: z.string(),
  test: z.string(),
  testNumber: z.number(),
  mitLeerzeichen: z.string(),
});

export const UpdateTest = ({ testId }: UpdateTestProps) => {
  const testQuery = useTest({ testId });
  const updateTestMutation = useUpdateTest();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateTestMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Test
          </Button>
        }
        title="Update Test"
        submitButton={
          <Button
            form="update-test"
            type="submit"
            size="sm"
            isLoading={updateTestMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateTestDTO["data"], typeof schema>
          id="update-test"
          onSubmit={async (values) => {
            await updateTestMutation.mutateAsync({ data: values, testId });
          }}
          options={{
            defaultValues: {
              id: testQuery.data?.id,
              createdAt: testQuery.data?.createdAt,
              test: testQuery.data?.test,
              testNumber: testQuery.data?.testNumber,
              mitLeerzeichen: testQuery.data?.mitLeerzeichen,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Id"
                type="number"
                error={formState.errors["id"]}
                registration={register("id", { valueAsNumber: true })}
              />
              <InputField
                label="CreatedAt"
                type="string"
                error={formState.errors["createdAt"]}
                registration={register("createdAt")}
              />
              <InputField
                label="Test"
                type="string"
                error={formState.errors["test"]}
                registration={register("test")}
              />
              <InputField
                label="TestNumber"
                type="number"
                error={formState.errors["testNumber"]}
                registration={register("testNumber", { valueAsNumber: true })}
              />
              <InputField
                label="MitLeerzeichen"
                type="string"
                error={formState.errors["mitLeerzeichen"]}
                registration={register("mitLeerzeichen")}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
