import React, { Suspense } from 'react';
import CollectionGallery from '@/components/public/CollectionGallery';

export const dynamic = 'force-dynamic';

export default function CollectionViewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Collection...</div>}>
            <CollectionGallery />
        </Suspense>
    );
}
