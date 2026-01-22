"use client";
import React, { use } from "react";
import Link from "next/link";
import { events } from "@/data/events";
import { notFound } from "next/navigation";

export default function EventDetailPage({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const event = events.find(e => e.id === id);

    if (!event) {
        return notFound();
    }

    const relatedEvents = events.filter(e => e.id !== id).slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${event.image}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4 md:px-10 lg:px-40">
                    <div className="max-w-[1200px] w-full mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6 w-fit">
                            <span className="material-symbols-outlined text-sm">star</span>
                            {event.category}
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-lg">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-slate-200 text-base md:text-lg font-medium">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_today</span>
                                {event.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                                {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-10 lg:px-40 py-12 -mt-10 relative z-10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        {/* Description Card */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                Giới thiệu sự kiện
                            </h2>
                            <div
                                className="text-slate-600 text-lg leading-relaxed flex flex-col gap-4"
                                dangerouslySetInnerHTML={{ __html: event.longDescription }}
                            ></div>
                        </div>

                        {/* Itinerary */}
                        {event.itinerary && event.itinerary.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                    Lịch trình dự kiến
                                </h2>
                                <div className="flex flex-col relative border-l-2 border-slate-100 ml-3 space-y-8">
                                    {event.itinerary.map((item, index) => (
                                        <div key={index} className="relative pl-8">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm"></div>
                                            <div className="text-primary font-bold text-lg mb-1">{item.time}</div>
                                            <div className="text-slate-800 font-bold text-xl">{item.activity}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Key Info & Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 flex flex-col gap-6">
                            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-300"></div>
                                <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">Giá vé tham dự</h3>
                                <div className="text-4xl font-black text-slate-900 mb-6">{event.price}</div>

                                <div className="flex flex-col gap-4 mb-8">
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="size-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <span className="material-symbols-outlined">confirmation_number</span>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 font-bold uppercase">Trạng thái</div>
                                            <div className="text-slate-900 font-bold">Đang mở bán</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="size-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                            <span className="material-symbols-outlined">group</span>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 font-bold uppercase">Giới hạn</div>
                                            <div className="text-slate-900 font-bold">200 khách</div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/booking"
                                    className="flex items-center justify-center w-full h-14 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:bg-green-700 hover:-translate-y-1 transition-all active:scale-95"
                                >
                                    Đặt Vé Ngay
                                </Link>
                                <div className="text-center mt-4">
                                    <span className="text-xs text-slate-400 font-medium">*Vé bao gồm 1 đồ uống welcome</span>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-3xl p-8 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <span className="material-symbols-outlined text-4xl text-white/20 mb-4">support_agent</span>
                                <h3 className="text-white font-bold text-lg mb-2">Cần hỗ trợ?</h3>
                                <p className="text-slate-400 text-sm mb-6">Liên hệ hotline của chúng tôi để được tư vấn đặt vé và đặt bàn VIP.</p>
                                <a href="tel:0912345678" className="text-primary font-black text-2xl hover:text-white transition-colors">0912 345 678</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Events */}
            <div className="py-20 px-4 md:px-10 lg:px-40 bg-white border-t border-slate-100">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Sự kiện khác</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedEvents.map(related => (
                            <Link key={related.id} href={`/events/${related.id}`} className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${related.image}")` }}
                                    ></div>
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-md">
                                        <span className="text-slate-900 text-xs font-bold uppercase tracking-wider">{related.category}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 p-6">
                                    <h4 className="text-slate-900 text-lg font-black leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-1">{related.title}</h4>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-3">
                                        <span className="material-symbols-outlined text-[16px]">calendar_today</span> {related.date}
                                    </div>
                                    <span className="text-primary text-sm font-bold mt-auto flex items-center gap-1 group-hover:underline">
                                        Xem chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
