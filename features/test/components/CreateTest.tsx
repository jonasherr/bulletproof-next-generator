import { PlusIcon } from "@heroicons/react/outline";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { CreateTestDTO, useCreateTest } from "../api/createTest";

const schema = z.object({
  id: z.number().min(1, "Required"),
  createdAt: z.string(),
  test: z.string(),
  testNumber: z.number(),
  mitLeerzeichen: z.string(),
});

export const CreateTest = () => {
  const createTestMutation = useCreateTest();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createTestMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Test
          </Button>
        }
        title="Create Test"
        submitButton={
          <Button
            form="create-test"
            type="submit"
            size="sm"
            isLoading={createTestMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTestDTO["data"], typeof schema>
          id="create-test"
          onSubmit={async (values) => {
            await createTestMutation.mutateAsync({ data: values });
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
