import { CustomLink, Spinner, Table } from "@/components/Elements";

import { useTests } from "../api/getTests";
import { TestType } from "../types";

import { DeleteTest } from "./DeleteTest";

export const TestsList = () => {
  const testsQuery = useTests();

  if (testsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!testsQuery.data) return null;

  return (
    <Table<TestType>
      data={testsQuery.data}
      columns={[
        {
          title: "Id",
          field: "id",
          Cell({ entry: { id } }) {
            return <span>{id}</span>;
          },
        },
        {
          title: "CreatedAt",
          field: "created_at",
          Cell({ entry: { createdAt } }) {
            return <span>{createdAt}</span>;
          },
        },
        {
          title: "Test",
          field: "test",
          Cell({ entry: { test } }) {
            return <span>{test}</span>;
          },
        },
        {
          title: "TestNumber",
          field: "testNumber",
          Cell({ entry: { testNumber } }) {
            return <span>{testNumber}</span>;
          },
        },
        {
          title: "MitLeerzeichen",
          field: "mitLeerzeichen",
          Cell({ entry: { mitLeerzeichen } }) {
            return <span>{mitLeerzeichen}</span>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <CustomLink href={`/test/${id}`}>View</CustomLink>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <DeleteTest id={id} />;
          },
        },
      ]}
    />
  );
};
