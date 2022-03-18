import { TrashIcon } from '@heroicons/react/outline';

import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteTuba } from '../api/deleteTuba';

type DeleteTubaProps = {
  id: number;
};

export const DeleteTuba = ({ id }: DeleteTubaProps) => {
  const deleteTubaMutation = useDeleteTuba();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Tuba"
        body="Are you sure you want to delete this tuba?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Tuba
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteTubaMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteTubaMutation.mutateAsync({ tubaId: id })}
          >
            Delete Tuba
          </Button>
        }
      />
    </Authorization>
  );
};
