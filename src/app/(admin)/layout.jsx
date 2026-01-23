"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CalendarDays,
    UtensilsCrossed,
    Settings,
    LogOut,
    Search,
    Bell,
    Menu as MenuIcon
} from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const menuItems = [
    {
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        label: 'Tổng quan',
    },
    {
        href: '/admin/bookings',
        icon: CalendarDays,
        label: 'Đặt bàn',
    },
    {
        href: '/admin/menu',
        icon: UtensilsCrossed,
        label: 'Thực đơn',
    },
];

const bottomMenuItems = [
    {
        href: '/admin/settings',
        icon: Settings,
        label: 'Cài đặt',
    },
];

function Sidebar({ className }) {
    const pathname = usePathname();

    return (
        <div className={`flex flex-col h-full bg-slate-50 border-r border-slate-200 ${className}`}>
            <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 p-1">
                        <img src="/logo-new.png" alt="Airwaves" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-slate-900 font-bold text-sm tracking-tight">Airwaves</h1>
                        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Admin Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 mb-1 ${isActive
                                        ? 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-semibold'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            <div className="p-3 border-t border-slate-200">
                {bottomMenuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 hover:text-slate-900">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname.includes('/admin/bookings')) return 'Quản lý Đặt bàn';
        if (pathname.includes('/admin/menu')) return 'Quản lý Thực đơn';
        if (pathname.includes('/admin/settings')) return 'Cài đặt Hệ thống';
        return 'Tổng quan';
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-50">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <MenuIcon className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64">
                                <Sidebar />
                            </SheetContent>
                        </Sheet>
                        <h2 className="text-lg font-bold text-slate-800">{getPageTitle()}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                type="search"
                                placeholder="Tìm kiếm..."
                                className="pl-9 w-64 bg-slate-50 border-slate-200 focus-visible:ring-primary"
                            />
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-500">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>

                        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 border border-slate-200">
                                        <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8HtiKmlnxfvhwrpdfsSCWexbPuqk_jEcuEKVUMY0mP1I9Hsw2NTcX-8NkMpw6Tv1LaAUBSE7wu2J-0nchwHvksizarAcuEno9DtUMDoqhnzWmxuKLT06gFrWCi_154tOuHB2jh6Cp0qqRgmj7XAGzPZl2Vl2kPLfVEZ94ti0hnu8ILRSd_BHvwuwZJ2jqns5SbbIG5qKOcojzK08DpNgX7XxV6Wm2uDcdlCs9Iec01Hbfpo2cHq2xpg86qIYsBZvEo3xwjl670YY" alt="User" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Quản lý Viên</p>
                                        <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Hồ sơ cá nhân</DropdownMenuItem>
                                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Đăng xuất</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-8 bg-white overflow-x-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
