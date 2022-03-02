import { ContentLayout } from "@/components/Layout";
import { Authorization, ROLES } from "@/lib/authorization";

import { UsersList } from "@/features/users/components/UsersList";

const Users = () => {
  return (
    <ContentLayout title="Users">
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <UsersList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};

export default Users;
