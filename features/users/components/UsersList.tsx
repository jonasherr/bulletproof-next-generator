import { Spinner, Table } from "@/components/Elements";
import { formatDate } from "@/utils/format";

import { useUsers } from "../api/getUsers";
import { UsersType } from "../types";

import { DeleteUser } from "./DeleteUser";

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!usersQuery.data) return null;

  return (
    <Table<UsersType>
      data={usersQuery.data}
      columns={[
        {
          title: "First Name",
          field: "firstName",
        },
        {
          title: "Last Name",
          field: "lastName",
        },
        {
          title: "Email",
          field: "email",
        },
        {
          title: "Role",
          field: "role",
        },
        {
          title: "Created At",
          field: "createdAt",
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
