"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, X } from "lucide-react";

export default function CollectionViewPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [collection, setCollection] = useState(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // We use a ghost container approach for "Native Vertical Scrollbar -> Horizontal Scroll"
    const containerRef = useRef(null);
    const ghostRef = useRef(null);

    // Smooth Scroll Refs
    const scrollTarget = useRef(0);
    const scrollCurrent = useRef(0);
    const requestRef = useRef(null);

    // Fetch images
    useEffect(() => {
        const fetchCollection = async () => {
            if (!id) return;
            try {
                const res = await fetch(`/api/v1/gallery-collections/${id}`, { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setCollection(data);
                    // Use images directly as they are sorted by 'order' from the API
                    setImages(data.images || []);
                }
            } catch (error) {
                console.error("Failed to fetch collection", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCollection();
    }, [id]);

    // Smooth Scroll Logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Init values
        scrollTarget.current = window.scrollY;
        scrollCurrent.current = window.scrollY;

        const ease = 0.08; // Adjust for smoothness (lower = slower/smoother, higher = snappier)

        const updateScroll = () => {
            // Linear Interpolation (Lerp)
            // current += (target - current) * ease
            const diff = scrollTarget.current - scrollCurrent.current;

            // Optimization: Stop updating if close enough
            if (Math.abs(diff) > 0.1) {
                scrollCurrent.current += diff * ease;

                // Apply transform
                container.style.transform = `translateX(-${scrollCurrent.current}px)`;

                // Update Index (Optional: Can debounce or use current)
                const windowWidth = window.innerWidth;
                setCurrentIndex(Math.round(scrollCurrent.current / windowWidth));

                requestRef.current = requestAnimationFrame(updateScroll);
            } else {
                // Snap to exact target when stopped to prevent jitter/blur
                scrollCurrent.current = scrollTarget.current;
                container.style.transform = `translateX(-${scrollCurrent.current}px)`;
                requestRef.current = null; // Mark as stopped
            }
        };

        const onScroll = () => {
            scrollTarget.current = window.scrollY;
            if (!requestRef.current) {
                requestRef.current = requestAnimationFrame(updateScroll);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Start loop once to sync initial position
        updateScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [images]); // Re-bind if images change to ensure correct container ref access (though ref is stable)

    if (isLoading) {
        return (
            <div className="h-screen w-screen bg-white flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">Loading</span>
                </div>
            </div>
        );
    }

    if (!collection) {
        return <div className="h-screen flex items-center justify-center">Collection not found</div>;
    }

    // Calculate width logic: Cover (100vw) + Images (100vw each)
    // Cover uses image[0], mapped images are slice(1). Total slides = images.length.
    const totalSlides = images.length || 1;

    return (
        // The outer div context. We need distinct styling here.
        // We render a 'ghost' div with total width translated to height to force a native vertical scrollbar.
        <div className="relative min-h-screen bg-white font-sans selection:bg-black selection:text-white">

            {/* Ghost Scroll Spacer - Defines the scrollable height of the page */}
            {/* Height mapping: 1px vertical = 1px horizontal */}
            {/* Total horizontal width = totalSlides * 100vw */}
            {/* To allow scrolling fully to the end, height needs to be approximately totalWidth. */}
            {/* We subtract 1 viewport height somewhat to match the end scroll position, but simplistic mapping is safer. */}
            {/* Let's set height to totalWidth. The extra viewport of scrolling usually is fine or we can tune it. */}
            {/* Actually, scrollable distance = ScrollHeight - ClientHeight. */}
            {/* Horizontal scrollable distance = ScrollWidth - ClientWidth. */}
            {/* So ScrollHeight should equal ScrollWidth to map 1:1 if we want exact end. */}
            <div
                ref={ghostRef}
                style={{ height: `calc(${(totalSlides - 1) * 100}vw + 40vw + 100vh)` }}
                className="w-px absolute top-0 left-0 pointer-events-none opacity-0"
            />
            {/* Header Fixed Elements */}
            <div className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="pointer-events-auto text-black hover:opacity-70 transition-opacity mixed-blend-difference"
                >
                    <X className="w-8 h-8" />
                </button>
            </div>

            {/* Bottom Fixed Elements */}
            <div className="fixed bottom-6 left-6 z-50 pointer-events-none mix-blend-difference text-white">
                <div className="text-xs font-bold tracking-widest -rotate-90 origin-bottom-left translate-x-4">
                    <span className="text-xl">{String(currentIndex + 1).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Horizontal Scroll Container - Fixed to Viewport */}
            {/* will-change-transform helps performance */}
            <div
                ref={containerRef}
                className="fixed top-0 left-0 h-full flex will-change-transform ease-out"
                style={{ width: `calc(${totalSlides * 100}vw + 40vw)` }}
            >
                {/* Slide 1: Cover / Intro */}
                {images.length > 0 && (
                    <div className="w-screen h-full flex-shrink-0 flex bg-white">
                        {/* LEFT: Typography */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-12 relative border-r border-gray-50">
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6">
                                    {collection?.category?.name || 'COLLECTION'}
                                </p>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-black leading-tight">
                                    {collection.name?.split(' ').map((word, i) => (
                                        <span key={i} className={`block ${i % 2 !== 0 ? 'font-light italic' : ''}`}>
                                            {word}
                                        </span>
                                    ))}
                                    {!collection.name && <span className="block">Untitled</span>}
                                </h1>
                                <div className="mt-12 w-16 h-[1px] bg-black mx-auto"></div>
                                <p className="mt-8 text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                                    {collection.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Image */}
                        <div className="hidden md:block w-1/2 h-full relative bg-white overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src={images[0].src}
                                alt="Cover"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* Remaining Slides - Fit Screen */}
                {images.slice(1).map((img, index) => (
                    <div
                        key={img.id || index}
                        className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-white p-4 md:p-12 lg:p-20"
                    >
                        <div className="w-full h-full flex items-center justify-center relative">
                            <img
                                src={img.src}
                                alt={`Gallery ${index + 2}`}
                                className="max-w-full max-h-full object-contain shadow-sm"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}

                {/* 40% Empty Space */}
                <div className="w-[40vw] h-full flex-shrink-0 bg-white relative flex items-center justify-center">
                    <div className="group cursor-pointer">
                        <div className="flex flex-col items-start inline-block">
                            <div className="relative">
                                {/* Base Text */}
                                <span className="text-5xl md:text-7xl font-black leading-none tracking-tighter whitespace-nowrap">
                                    <span className="text-gray-200">NEXT PROJECT</span>
                                </span>
                                {/* Overlay Text (Wipe) */}
                                <span className="absolute inset-0 text-5xl md:text-7xl font-black text-black leading-none tracking-tighter overflow-hidden w-0 group-hover:w-full transition-all duration-1000 ease-in-out whitespace-nowrap">
                                    NEXT PROJECT
                                </span>
                            </div>

                            {/* Underline */}
                            <div className="w-full h-1 md:h-1.5 bg-gray-200 mt-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-1000 ease-in-out"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* If no images */}
                {images.length === 0 && (
                    <div className="w-screen h-full flex-shrink-0 flex items-center justify-center">
                        <p className="text-gray-400 tracking-widest text-xs uppercase">No images found</p>
                    </div>
                )}
            </div>

            {/* Global style to ensure body is scrollable */}
            <style jsx global>{`
                body {
                    overflow-x: hidden;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}
