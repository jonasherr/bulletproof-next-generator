import { useRouter } from "next/router";
import Head from "next/head";

import { Spinner, MDPreview } from '@/components/Elements';
import { ContentLayout, MainLayout } from '@/components/Layout';
import { formatDate } from '@/utils/format';

import { useTest } from '@/features/test/api/getTest';
import { UpdateTest } from '@/features/test/components/UpdateTest';

const Test = () => {
const { query } = useRouter();
const testId = parseInt(query.testId as string);
const testQuery = useTest({ testId });

if (testQuery.isLoading) {
    return (
        <div className="w-full h-48 flex justify-center items-center">
            <Spinner size="lg"/>
        </div>
    );
}

if (!testQuery.data) return null;

    return (
        <>
            <Head>
                <title>{ testQuery.data.id}</title>
            </Head>
            <MainLayout>
                <ContentLayout title={ testQuery.data.id.toString()}>
                    <span className="text-xs font-bold">{formatDate(testQuery.data.createdAt)}</span>
                    <div className="mt-6 flex flex-col space-y-16">
                        <div className="flex justify-end">
                            <UpdateTest testId
                            ={ testId}/>
                        </div>
                        <div>
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="mt-1 max-w-2xl text-sm text-gray-500">
                                        <MDPreview value={ testQuery.data.body}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentLayout>
            </MainLayout>
        </>
    );
};

export default Test
