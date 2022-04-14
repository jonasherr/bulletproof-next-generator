import { TrashIcon } from '@heroicons/react/outline';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteTest } from '../api/deleteTest';

type DeleteTestProps = {
  id: number;
};

export const DeleteTest = ({ id }: DeleteTestProps) => {
  const deleteTestMutation = useDeleteTest();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Test"
        body="Are you sure you want to delete this test?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Test
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteTestMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteTestMutation.mutateAsync({ testId: id })}
          >
            Delete Test
          </Button>
        }
      />
    </Authorization>
  );
};
