import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTubaDTO, useCreateTuba } from '../api/createTuba';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const CreateTuba = () => {
  const createTubaMutation = useCreateTuba();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createTubaMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Tuba
          </Button>
        }
        title="Create Tuba"
        submitButton={
          <Button
            form="create-tuba"
            type="submit"
            size="sm"
            isLoading={createTubaMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTubaDTO['data'], typeof schema>
          id="create-tuba"
          onSubmit={async (values) => {
            await createTubaMutation.mutateAsync({ data: values });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />

              <TextAreaField
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
