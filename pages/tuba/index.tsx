import { ContentLayout } from '@/components/Layout';

import { CreateTuba } from '@/features/tuba/components/CreateTuba';
import { TubasList } from '@/features/tuba/components/TubasList';

export const Tubas = () => {
return (
<ContentLayout title="Tubas">
    <div className="flex justify-end">
        <CreateTuba />
    </div>
    <div className="mt-4">
        <TubasList/>
    </div>
</ContentLayout>
);
};
