import { CustomLink, Spinner, Table } from "@/components/Elements";
import { formatDate } from "@/utils/format";

import { useDiscussions } from "../api/getDiscussions";
import { DiscussionsType } from "../types";

import { DeleteDiscussion } from "./DeleteDiscussion";

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions();

  if (discussionsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!discussionsQuery.data) return null;

  return (
    <Table<DiscussionsType>
      data={discussionsQuery.data}
      columns={[
        {
          title: "Title",
          field: "title",
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
            return <CustomLink href={`/discussions/${id}`}>View</CustomLink>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <DeleteDiscussion id={id} />;
          },
        },
      ]}
    />
  );
};
