"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";

export default function EventDetailPage({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [event, setEvent] = useState(null);
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all events to get current + related
                // Ideally this would be two calls: get detail, get related.
                // But fetching all allows us to replicate the "related" logic easily for now.
                const res = await fetch('/api/v1/events');
                if (res.ok) {
                    const allEvents = await res.json();
                    const foundEvent = allEvents.find(e => e.id === id);

                    if (foundEvent) {
                        setEvent(foundEvent);
                        setRelatedEvents(allEvents.filter(e => e.id !== id).slice(0, 3));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch event details", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Sự kiện không tồn tại</h1>
                <Link href="/events" className="text-primary hover:underline">Quay lại danh sách sự kiện</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">


            {/* Main Content */}
            <div className="px-4 md:px-10 lg:px-40 py-12 relative z-10">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            <span className="material-symbols-outlined text-sm">star</span>
                            {event.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                            {event.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column: Details */}
                        <div className="lg:col-span-2 flex flex-col gap-10">
                            {/* Image Gallery/Slider */}
                            {event.images?.length > 0 && (
                                <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                                    {/* Main Image */}
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={event.images[currentImageIndex]}
                                            alt={`${event.title} - Hình ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover transition-all duration-500"
                                        />

                                        {/* Navigation Arrows - Only show if multiple images */}
                                        {event.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? event.images.length - 1 : prev - 1)}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                                                >
                                                    <span className="material-symbols-outlined text-slate-700">chevron_left</span>
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev => prev === event.images.length - 1 ? 0 : prev + 1)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                                                >
                                                    <span className="material-symbols-outlined text-slate-700">chevron_right</span>
                                                </button>
                                            </>
                                        )}

                                        {/* Image Counter */}
                                        {event.images.length > 1 && (
                                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                                                {currentImageIndex + 1} / {event.images.length}
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnail Strip - Only show if multiple images */}
                                    {event.images.length > 1 && (
                                        <div className="p-4 border-t border-slate-100">
                                            <div className="flex gap-2 overflow-x-auto">
                                                {event.images.map((img, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                                                            ? 'border-primary shadow-md scale-105'
                                                            : 'border-transparent opacity-70 hover:opacity-100'
                                                            }`}
                                                    >
                                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Description Card - Only show if content exists */}
                            {event.content && (
                                <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                                        <span className="w-2 h-10 bg-gradient-to-b from-primary to-green-300 rounded-full shadow-lg shadow-green-200"></span>
                                        Giới thiệu sự kiện
                                    </h2>
                                    <div
                                        className="ck-content text-slate-600 text-lg leading-relaxed font-normal"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    ></div>
                                </div>
                            )}

                            {/* Itinerary or Timeline */}
                            {(event.timeline?.length > 0 || event.itinerary?.length > 0) && (
                                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
                                    <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
                                        <span className="w-2 h-10 bg-gradient-to-b from-primary to-green-300 rounded-full shadow-lg shadow-green-200"></span>
                                        Lịch trình sự kiện
                                    </h2>

                                    {event.timeline && event.timeline.length > 0 ? (
                                        // Complex Timeline Rendering
                                        <div className="flex flex-col gap-16">
                                            {event.timeline.map((group, gIndex) => (
                                                <div key={gIndex}>
                                                    {/* Points */}
                                                    <div className="relative pl-2">
                                                        <div className="absolute left-[24px] -translate-x-1/2 top-2 bottom-0 w-[1px] bg-slate-100"></div>
                                                        <div className="flex flex-col gap-6">
                                                            {group.point?.map((point, pIndex) => (
                                                                <div key={pIndex} className="relative flex items-start gap-6 group">
                                                                    {/* Dot */}
                                                                    <div className="absolute left-0 top-0 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-green-50 z-10 flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                                                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 shadow-sm group-hover:scale-110 transition-transform"></div>
                                                                    </div>

                                                                    <div className="flex-1 ml-12">
                                                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                                                                            <span className="text-green-600 font-bold text-lg whitespace-nowrap w-10 flex-shrink-0 text-left">
                                                                                {point.timeline_hour}
                                                                            </span>

                                                                            {/* Horizontal Separator */}
                                                                            <div className="hidden md:block w-8 h-[1px] bg-slate-200 mt-3"></div>

                                                                            <div className="flex-1">
                                                                                {point.timeline_title && (
                                                                                    <div className="text-slate-900 font-bold text-lg leading-tight mb-1">
                                                                                        {point.timeline_title}
                                                                                    </div>
                                                                                )}
                                                                                <div className={`text-slate-700 ${point.timeline_title ? 'font-normal' : 'font-bold text-lg'}`}>
                                                                                    {point.timeline_point}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {point.image && (
                                                                            <div className="mt-4 md:ml-[min(140px,20%)] max-w-md rounded-xl overflow-hidden shadow-md">
                                                                                <img src={point.image} alt={point.timeline_title || point.timeline_point} className="w-full h-auto object-cover" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="relative pl-2">
                                            {/* Timeline Line */}
                                            <div className="absolute left-[15px] top-2 bottom-10 w-[1px] bg-slate-100"></div>

                                            <div className="flex flex-col gap-10">
                                                {event.itinerary.map((item, index) => (
                                                    <div key={index} className="relative flex items-start gap-6 group">
                                                        {/* Dot */}
                                                        <div className="absolute left-0 top-0 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-green-50 z-10 flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                                            <div className="w-[10px] h-[10px] rounded-full bg-green-500 shadow-sm group-hover:scale-110 transition-transform"></div>
                                                        </div>

                                                        <div className="flex-1 ml-12 pt-1">
                                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                                                                <span className="text-green-600 font-bold text-lg whitespace-nowrap w-20 flex-shrink-0 text-right">
                                                                    {item.time}
                                                                </span>

                                                                {/* Horizontal Separator - Hidden on mobile, visible on desktop */}
                                                                <div className="hidden md:block w-8 h-[1px] bg-slate-200"></div>

                                                                <h3 className="text-slate-900 font-bold text-lg leading-tight">
                                                                    {item.activity}
                                                                </h3>
                                                            </div>

                                                            {item.description && (
                                                                <p className="text-slate-500 text-base font-normal leading-relaxed md:pl-[min(140px,20%)]">
                                                                    {item.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Key Info & Booking */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 flex flex-col gap-8">

                                <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
                                    <div className="flex flex-col gap-6">
                                        {/* Time */}
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                                <span className="material-symbols-outlined">calendar_today</span>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Thời gian</div>
                                                <div className="text-slate-900 font-bold text-lg leading-tight mb-1">{event.date}</div>
                                                <div className="text-slate-500 font-medium text-sm">{event.time}</div>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                                <span className="material-symbols-outlined">location_on</span>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Địa điểm</div>
                                                <div className="text-slate-900 font-bold text-lg leading-tight mb-1">{event.location}</div>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                                <span className="material-symbols-outlined">payments</span>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Giá vé</div>
                                                <div className="text-slate-900 font-bold text-lg leading-tight mb-1">
                                                    {!event.price || event.price === 0
                                                        ? "Miễn phí"
                                                        : <>{event.price.toLocaleString('vi-VN')} <span className="text-slate-500 font-medium text-sm">VND/ Người</span></>
                                                    }
                                                </div>
                                                {event.price > 0 && (
                                                    <div className="text-slate-500 font-medium text-sm">(Bao gồm 1 đồ uống tự chọn)</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-8 border-slate-100" />

                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href="/booking"
                                            className="flex items-center justify-center w-full h-14 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:bg-green-700 hover:-translate-y-1 transition-all active:scale-95"
                                        >
                                            Đặt Vé Ngay
                                        </Link>
                                    </div>
                                </div>

                                <div className="bg-slate-900 rounded-3xl p-8 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <span className="material-symbols-outlined text-4xl text-white/20 mb-4">support_agent</span>
                                    <h3 className="text-white font-bold text-lg mb-2">Cần hỗ trợ?</h3>
                                    <p className="text-slate-400 text-sm mb-6">Liên hệ hotline của chúng tôi để được tư vấn đặt vé và đặt bàn VIP.</p>
                                    <a href="tel:0912345678" className="text-primary font-black text-2xl hover:text-white transition-colors">0948 xxx xxx</a>
                                </div>
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
