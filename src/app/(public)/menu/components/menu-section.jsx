"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const MenuSection = ({ title, items, gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }) => {
    const INITIAL_COUNT = 6;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleSeeMore = () => {
        setVisibleCount(items.length); // Show all
    };

    const handleCollapse = () => {
        setVisibleCount(INITIAL_COUNT);
    };

    const displayedItems = items.slice(0, visibleCount);
    const hasMore = items.length > visibleCount;

    // Helper to format price (duplicated from page for now or utility)
    const formatPrice = (price) => {
        if (!price) return "";
        if (/^\d+$/.test(price)) {
            return parseInt(price).toLocaleString('vi-VN') + " đ";
        }
        return price;
    };

    return (
        <div className="mb-12 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 px-4 pb-6 pt-2">
                <h2 className="text-slate-900 tracking-tight text-[28px] md:text-[32px] font-bold leading-tight">{title}</h2>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>

            {/* Grid Container */}
            <div className={`
                flex overflow-x-auto snap-x snap-mandatory gap-4 p-4 no-scrollbar -mx-4 px-8 pb-8
                lg:grid lg:overflow-visible lg:mx-0 lg:px-4 lg:pb-4 ${gridCols}
            `}>
                {displayedItems.map((item, idx) => (
                    <div key={idx} className="
                        group flex flex-col gap-4 p-4 rounded-2xl bg-white border border-slate-100 
                        min-w-[85vw] sm:min-w-[300px] snap-center
                        lg:min-w-0 lg:snap-align-none
                        hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300
                    ">
                        <div className="w-full relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
                            {item.image ? (
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${item.image}")` }}></div>
                            ) : (
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                            )}
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-slate-900 text-lg font-bold leading-normal group-hover:text-primary transition-colors">{item.name}</p>
                                {/* Price hidden as requested */}
                                {/* <span className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg text-sm">{formatPrice(item.price)}</span> */}
                            </div>
                            <p className="text-slate-500 text-sm font-normal leading-relaxed line-clamp-2">{item.desc || item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {items.length > INITIAL_COUNT && (
                <div className="flex justify-center mt-4">
                    {hasMore ? (
                        <Button
                            variant="outline"
                            onClick={handleSeeMore}
                            className="gap-2 px-8 py-6 rounded-full text-base font-medium border-slate-200 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
                        >
                            Xem thêm
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={handleCollapse}
                            className="gap-2 px-8 py-6 rounded-full text-base font-medium border-slate-200 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                            Thu gọn
                            <ChevronDown className="w-4 h-4 rotate-180" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
