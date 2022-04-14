import { ContentLayout, MainLayout } from '@/components/Layout';

import { CreateTest } from '@/features/test/components/CreateTest';
import { TestsList } from '@/features/test/components/TestsList';

const Tests = () => {
    return (
        <MainLayout>
            <ContentLayout title="Tests">
                <div className="flex justify-end">
                    <CreateTest />
                </div>
                <div className="mt-4">
                    <TestsList/>
                </div>
            </ContentLayout>
        </MainLayout>
    );
};

export default Tests
