"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, categoriesRes] = await Promise.all([
                    fetch('/api/v1/events'),
                    fetch('/api/v1/event-categories')
                ]);

                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json();
                    setEvents(eventsData);
                }

                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json();
                    setCategories(categoriesData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter out hidden events first
    const visibleEvents = events.filter(e => !e.isHidden);

    // Get the featured event (only if explicitly marked as isFeatured and not hidden)
    const featuredEvent = visibleEvents.find(e => e.isFeatured) || null;

    // Filter events for grid
    const gridEvents = visibleEvents.filter(e => {
        if (featuredEvent && e.id === featuredEvent.id) return false;
        if (filter === 'all') return true;
        return e.category === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="px-4 pt-6 md:px-10 lg:px-40 bg-slate-50 flex justify-center">
                <div className="relative w-full max-w-[1200px] h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Sunset cocktail"
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            src="https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=2000&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-10 lg:px-40 py-16 flex justify-center bg-white">
                <div className="w-full max-w-[1200px] flex flex-col gap-12">

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <h2 className="text-slate-900 text-3xl font-black tracking-tight relative pl-4 border-l-4 border-primary">Sự Kiện Sắp Tới</h2>
                        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto p-1">
                            <button
                                onClick={() => setFilter('all')}
                                className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95 ${filter === 'all'
                                    ? "bg-primary text-white shadow-lg shadow-green-500/20"
                                    : "bg-white text-slate-600 border border-gray-200 hover:text-primary hover:border-primary hover:shadow-md"
                                    }`}
                            >
                                Tất cả
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.name)}
                                    className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95 ${filter === cat.name
                                        ? "bg-primary text-white shadow-lg shadow-green-500/20"
                                        : "bg-white text-slate-600 border border-gray-200 hover:text-primary hover:border-primary hover:shadow-md"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Event */}
                    {featuredEvent && (
                        <Link href={`/events/${featuredEvent.id}`} className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="h-[350px] lg:h-auto overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 lg:hidden"></div>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${featuredEvent.image}")` }}
                                    ></div>
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-14 gap-8 relative bg-white">
                                    <div className="hidden lg:flex absolute top-10 right-10 flex-col items-center justify-center w-20 h-20 bg-white rounded-2xl border border-gray-100 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-primary text-xs font-bold uppercase tracking-wider">
                                            {featuredEvent.rawDate ? new Date(featuredEvent.rawDate).toLocaleString('default', { month: 'short' }) : 'Date'}
                                        </span>
                                        <span className="text-slate-900 text-3xl font-black">
                                            {featuredEvent.rawDate ? new Date(featuredEvent.rawDate).getDate() : '??'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                                            <span className="material-symbols-outlined text-lg">star</span>
                                            {featuredEvent.category}
                                        </div>
                                        <h3 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight group-hover:text-primary transition-colors duration-300">
                                            {featuredEvent.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-base mt-2 font-medium">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">calendar_today</span>
                                                {featuredEvent.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">schedule</span>
                                                {featuredEvent.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary">location_on</span>
                                                {featuredEvent.location}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed border-l-2 border-gray-200 pl-4 line-clamp-3">
                                        {featuredEvent.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <div className="flex items-center justify-center h-12 px-10 rounded-full border border-gray-200 bg-white text-slate-900 font-bold text-base group-hover:border-primary group-hover:text-primary transition-all hover:-translate-y-1 active:scale-95 shadow-sm">
                                            Xem Chi Tiết
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(showAll ? gridEvents : gridEvents.slice(0, 6)).map((event) => (
                            <Link key={event.id} href={`/events/${event.id}`} className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${event.image}")` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-md">
                                        <span className="text-slate-900 text-xs font-bold uppercase tracking-wider">{event.category}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="font-bold text-sm bg-primary/90 inline-block px-2 py-0.5 rounded mb-1">{event.date}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 p-6 gap-4">
                                    <div>
                                        <h4 className="text-slate-900 text-xl font-black leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-1">{event.title}</h4>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                            <span className="material-symbols-outlined text-[18px]">schedule</span> {event.time}
                                            <span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                        {event.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="w-full py-2 rounded-lg text-slate-900 text-sm font-bold group-hover:text-primary flex items-center justify-between transition-colors group/btn">
                                            {(!event.price || event.price === 0 || event.price === 'Miễn phí') ? 'Xem Chi Tiết' : 'Đặt Vé Ngay'}
                                            <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform text-gray-400 group-hover/btn:text-primary">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {gridEvents.length > 6 && !showAll && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowAll(true)}
                                className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wide group"
                            >
                                Xem thêm sự kiện
                                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white py-20 px-4 md:px-20 border-t border-gray-100">
                <div className="max-w-[1000px] mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
                    <div className="flex-1">
                        <h3 className="text-slate-900 text-2xl md:text-3xl font-black mb-3">Đừng Bỏ Lỡ Cuộc Vui!</h3>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed">Đăng ký để nhận thông tin về các sự kiện mới nhất và ưu đãi đặc biệt từ Airwaves.</p>
                    </div>
                    <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                        <input className="h-14 px-6 rounded-full bg-white border border-gray-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-72 shadow-sm" placeholder="Email của bạn" type="email" />
                        <button className="h-14 px-8 rounded-full bg-primary text-white font-bold hover:bg-green-700 transition-all whitespace-nowrap shadow-lg shadow-green-500/20 active:scale-95">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
