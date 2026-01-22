"use client";
import React, { useState } from "react";
import Link from "next/link";
import { events } from "@/data/events";

export default function EventsPage() {
    const [filter, setFilter] = useState("all");

    // Get the featured event (e.g., the first one for now, or by a specific flag)
    const featuredEvent = events[0];

    // Filter events based on category (excluding the featured one if desired, or keep all)
    // For this simple implementation, let's just show all except the featured one in the grid, or all of them.
    // Let's filter out the featured event from the grid to avoid duplication if it's prominently displayed.
    const gridEvents = events.filter(e => e.id !== featuredEvent.id);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="@container">
                <div className="relative flex min-h-[500px] flex-col items-center justify-center p-4 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white"></div>
                        <img
                            alt="Phu Quoc beach party at night with lights and crowd"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIvey49gi6cMpdseC6v6pqH-zDVBPalI_sPawMtQFP9q2wId8LOdeDmj_RfuIagzGQgYDIYtZ2Og44FulQzkzlLbf4J-nZHq9ScF_TPY6vVR7BT35XqUlIxHGZTuLTWX_1HsTOeRPBsXEnAa3nrqM8NLCEff8RsIsiupQvQcD8-UpKkY8Zz0SUx2HEfIVs4FMSZlZdRfwuiKY5wgRA2wZwNEgo7OSufCpEAAjqU5Nux7Y-PCQIGnoA4WYuY6Oe9F1VwXzC_ob8tfg"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col gap-6 max-w-[800px] animate-fade-in-up">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto shadow-sm">
                            <span className="material-symbols-outlined text-green-400 text-sm">water_drop</span>
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Nightlife Phú Quốc</span>
                        </div>
                        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-2xl">
                            Nhịp Đập Của <br /><span className="text-green-400">Biển Xanh</span>
                        </h1>
                        <p className="text-slate-100 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                            Hòa mình vào làn gió biển mát lạnh, âm nhạc sôi động và những ly cocktail màu xanh ngọc bích tuyệt đẹp.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <button className="flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-bold text-base hover:bg-white hover:text-primary transition-all duration-300 shadow-xl shadow-green-900/20 hover:-translate-y-1">
                                Xem Lịch Sự Kiện
                            </button>
                            <button className="flex items-center justify-center h-12 px-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold text-base hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group shadow-lg">
                                <span className="material-symbols-outlined mr-2 group-hover:text-green-300 transition-colors">play_circle</span>
                                Xem Video
                            </button>
                        </div>
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
                            {['all', 'Cuối tuần này', 'Nhạc sống', 'DJ Sets', 'Đặc biệt'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95 ${filter === f
                                            ? "bg-primary text-white shadow-lg shadow-green-500/20"
                                            : "bg-white text-slate-600 border border-gray-200 hover:text-primary hover:border-primary hover:shadow-md"
                                        }`}
                                >
                                    {f === 'all' ? 'Tất cả' : f}
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
                                        <span className="text-primary text-xs font-bold uppercase tracking-wider">Tháng 10</span>
                                        <span className="text-slate-900 text-3xl font-black">24</span>
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
                                        <button className="flex items-center justify-center h-12 px-10 rounded-full bg-primary text-white font-bold text-base hover:bg-green-700 hover:text-white transition-all shadow-lg shadow-green-500/30 hover:-translate-y-1 active:scale-95">
                                            Đặt Vé Ngay
                                        </button>
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
                        {gridEvents.map((event) => (
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
                                            <span className="mx-1">•</span>
                                            <span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                        {event.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="w-full py-2 rounded-lg text-slate-900 text-sm font-bold group-hover:text-primary flex items-center justify-between transition-colors group/btn">
                                            {event.price === 'Miễn phí' ? 'Xem Chi Tiết' : 'Đặt Vé Ngay'}
                                            <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform text-gray-400 group-hover/btn:text-primary">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wide group">
                            Xem thêm sự kiện
                            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white py-20 px-4 md:px-20 border-t border-gray-100">
                <div className="max-w-[1000px] mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
                    <div className="flex-1">
                        <h3 className="text-slate-900 text-2xl md:text-3xl font-black mb-3">Đừng Bỏ Lỡ Cuộc Vui!</h3>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed">Đăng ký để nhận thông tin về các sự kiện mới nhất và ưu đãi đặc biệt từ Airwave.</p>
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
