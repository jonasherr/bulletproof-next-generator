import { MDPreview, Spinner } from "@/components/Elements";
import Head from "next/head";
import { ContentLayout } from "@/components/Layout";
import { Comments } from "@/features/comments";
import { formatDate } from "@/utils/format";

import { useDiscussion } from "@/features/discussions/api/getDiscussion";
import { UpdateDiscussion } from "@/features/discussions/components/UpdateDiscussion";
import { useRouter } from "next/router";
import * as React from "react";

const Discussion = () => {
  const { query } = useRouter();
  const discussionId = query.discussionId as string;
  const discussionQuery = useDiscussion({ discussionId });

  if (discussionQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!discussionQuery.data) return null;

  return (
    <>
      <Head>
        <title>{discussionQuery.data.title}</title>
      </Head>
      <ContentLayout title={discussionQuery.data.title}>
        <span className="text-xs font-bold">
          {formatDate(discussionQuery.data.createdAt)}
        </span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateDiscussion discussionId={discussionId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={discussionQuery.data.body} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Comments discussionId={discussionId} />
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default Discussion;
