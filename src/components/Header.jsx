"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? "text-primary" : "text-slate-600 hover:text-primary";

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-sm">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 md:px-10 flex flex-1 justify-center py-4">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <div className="flex items-center justify-between whitespace-nowrap">
                            <Link href="/" className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity animate-logo-entrance">
                                <span className="material-symbols-outlined text-primary text-4xl animate-icon-float">local_bar</span>
                                <h2 className="text-slate-900 text-xl font-extrabold leading-tight tracking-[-0.02em]">Airwave Beach Club</h2>
                            </Link>

                            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                                <div className="flex items-center gap-6 lg:gap-10">
                                    <Link className={`${isActive('/')} transition-colors text-sm font-semibold leading-normal`} href="/">Trang chủ</Link>
                                    <Link className={`${isActive('/menu')} transition-colors text-sm font-semibold leading-normal`} href="/menu">Thực đơn</Link>
                                    <Link className={`${isActive('/events')} transition-colors text-sm font-semibold leading-normal`} href="/events">Sự kiện</Link>
                                    <Link className={`${isActive('/collection')} transition-colors text-sm font-semibold leading-normal`} href="/collection">Thư viện</Link>
                                    <Link className={`${isActive('/contact')} transition-colors text-sm font-semibold leading-normal`} href="/contact">Liên hệ</Link>
                                </div>
                                <Link href="/booking" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary hover:bg-primary-hover transition-colors text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] shadow-md shadow-green-500/20">
                                    <span className="truncate">Đặt bàn ngay</span>
                                </Link>
                            </div>

                            <div className="md:hidden text-slate-900 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <span className="material-symbols-outlined text-3xl">menu</span>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-slate-100 pt-4 animate-in slide-in-from-top-2">
                                <Link className="text-slate-600 hover:text-primary font-semibold" href="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
                                <Link className="text-slate-600 hover:text-primary font-semibold" href="/menu" onClick={() => setIsMenuOpen(false)}>Thực đơn</Link>
                                <Link className="text-slate-600 hover:text-primary font-semibold" href="/events" onClick={() => setIsMenuOpen(false)}>Sự kiện</Link>
                                <Link className="text-slate-600 hover:text-primary font-semibold" href="/collection" onClick={() => setIsMenuOpen(false)}>Thư viện</Link>
                                <Link className="text-slate-600 hover:text-primary font-semibold" href="/contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>
                                <Link className="w-full py-3 rounded-full bg-primary font-bold text-slate-900 shadow-md text-center" href="/booking" onClick={() => setIsMenuOpen(false)}>Đặt bàn ngay</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
