"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';

function CollectionGalleryContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [collection, setCollection] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        const fetchCollection = async () => {
            try {
                const res = await fetch(`/api/v1/gallery-collections/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCollection(data);
                }
            } catch (error) {
                console.error("Failed to fetch collection", error);
            }
        };
        fetchCollection();
    }, [id]);

    if (!collection) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-black p-8 pt-24">
            <h1 className="text-4xl font-serif mb-8 text-center">{collection.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {collection.images?.map((img: any, i: number) => (
                    <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                        <img src={img.src} alt={img.alt || 'Gallery image'} className="w-full h-auto object-cover" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function CollectionGallery() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CollectionGalleryContent />
        </Suspense>
    );
}
