import { ContentLayout, MainLayout } from "@/components/Layout";

import { CreateDiscussion } from "@/features/discussions/components/CreateDiscussion";
import { DiscussionsList } from "@/features/discussions/components/DiscussionsList";

const Discussions = () => {
  return (
    <MainLayout>
      <ContentLayout title="Discussions">
        <div className="flex justify-end">
          <CreateDiscussion />
        </div>
        <div className="mt-4">
          <DiscussionsList />
        </div>
      </ContentLayout>
    </MainLayout>
  );
};

export default Discussions;
