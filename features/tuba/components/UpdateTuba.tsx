import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTuba } from '../api/getTuba';
import { UpdateTubaDTO, useUpdateTuba } from '../api/updateTuba';

type UpdateTubaProps = {
  tubaId: string;
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const UpdateTuba = ({ tubaId }: UpdateTubaProps) => {
  const tubaQuery = useTuba({ tubaId });
  const updateTubaMutation = useUpdateTuba();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateTubaMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Tuba
          </Button>
        }
        title="Update Tuba"
        submitButton={
          <Button
            form="update-tuba"
            type="submit"
            size="sm"
            isLoading={updateTubaMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<UpdateTubaDTO['data'], typeof schema>
          id="update-tuba"
          onSubmit={async (values) => {
            await updateTubaMutation.mutateAsync({ data: values, tubaId });
          }}
          options={ {
            defaultValues: {
              body: tubaQuery.data?.body,
            },
          } }
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
