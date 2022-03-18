import { useRouter } from "next/router";
import Head from "next/head";

import { Spinner, MDPreview } from '@/components/Elements';
import { ContentLayout, MainLayout } from '@/components/Layout';
import { formatDate } from '@/utils/format';

import { useTuba } from '@/features/tuba/api/getTuba';
import { UpdateTuba } from '@/features/tuba/components/UpdateTuba';

export const Tuba = () => {
const { query } = useRouter();
const tubaId = query.tubaId as string;
const tubaQuery = useTuba({ tubaId });

if (tubaQuery.isLoading) {
return (
<div className="w-full h-48 flex justify-center items-center">
    <Spinner size="lg"/>
</div>
);
}

if (!tubaQuery.data) return null;

return (
<>
<Head>
    <title>{ tubaQuery.data.id}</title>
</Head>
<MainLayout>
    <ContentLayout title={ tubaQuery.data.id.toString()}>
        <span className="text-xs font-bold">{formatDate(tubaQuery.data.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
            <div className="flex justify-end">
                <UpdateTuba tubaId
                ={ tubaId}/>
            </div>
            <div>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="mt-1 max-w-2xl text-sm text-gray-500">
                            <MDPreview value={ tubaQuery.data.body}/>
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
