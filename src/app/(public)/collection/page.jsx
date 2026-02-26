"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

export default function CollectionPage() {
    const router = useRouter();
    const [collections, setCollections] = React.useState([]);

    React.useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch('/api/v1/gallery-collections', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setCollections(data);
                }
            } catch (error) {
                console.error("Failed to fetch gallery collections", error);
            }
        };
        fetchCollections();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Grid Layout */}
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {collections.map((col, index) => {
                        const coverSrc = col.coverImage || (col.images && col.images.length > 0 ? col.images[0].src : null);
                        if (!coverSrc) return null;

                        return (
                            <Link
                                key={col.id}
                                href={`/collection/view?id=${col.id}`}
                                className="relative aspect-[3/4] group overflow-hidden bg-gray-100 block cursor-pointer"
                            >
                                <motion.img
                                    layoutId={`image-${col.id}`}
                                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                                    src={coverSrc}
                                    alt={col.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay with info */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-4 text-center z-10">
                                    <p className="text-xs uppercase tracking-widest mb-2">{col.category?.name}</p>
                                    <h3 className="text-2xl font-serif italic">{col.name}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {collections.length === 0 && (
                    <div className="h-[50vh] flex items-center justify-center text-slate-400 font-light">
                        Loading collections...
                    </div>
                )}
            </div>
        </div>
    );
}
