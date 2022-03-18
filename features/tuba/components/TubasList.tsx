import { CustomLink, Spinner, Table } from "@/components/Elements";
import { formatDate } from "@/utils/format";

import { useTubas } from "../api/getTubas";
import { TubaType } from "../types";

import { DeleteTuba } from "./DeleteTuba";

export const TubasList = () => {
  const tubasQuery = useTubas();

  if (tubasQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tubasQuery.data) return null;

  return (
    <Table<TubaType>
      data={ tubasQuery.data }
      columns={[
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
            return <CustomLink href={`/tubas/${id}`}>View</CustomLink>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <DeleteTuba id={id} />;
          },
        },
      ]}
    />
  );
};
