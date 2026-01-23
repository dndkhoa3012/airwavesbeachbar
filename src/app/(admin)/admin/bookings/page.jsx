"use client";
import React, { useState } from 'react';
import {
    Search,
    Calendar,
    CheckCircle2,
    XCircle,
    Trash2,
    MoreHorizontal,
    Phone,
    Users
} from 'lucide-react';
import dayjs from 'dayjs';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Dummy data
const initialData = [
    {
        key: '1',
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        date: '2024-05-20',
        time: '18:00',
        guests: 4,
        status: 'confirmed',
        notes: 'Bàn gần cửa sổ'
    },
    {
        key: '2',
        name: 'Trần Thị B',
        phone: '0912345678',
        date: '2024-05-21',
        time: '19:30',
        guests: 2,
        status: 'pending',
        notes: 'Kỷ niệm ngày cưới'
    },
    {
        key: '3',
        name: 'Lê Văn C',
        phone: '0987654321',
        date: '2024-05-22',
        time: '20:00',
        guests: 6,
        status: 'cancelled',
        notes: ''
    },
    {
        key: '4',
        name: 'Phạm Thị D',
        phone: '0933445566',
        date: '2024-05-23',
        time: '17:00',
        guests: 3,
        status: 'pending',
        notes: 'Dị ứng hải sản'
    },
    {
        key: '5',
        name: 'Hoàng Văn E',
        phone: '0977889900',
        date: '2024-05-23',
        time: '18:30',
        guests: 10,
        status: 'confirmed',
        notes: 'Tiệc sinh nhật'
    }
];

export default function AdminBookingsPage() {
    const [data, setData] = useState(initialData);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none font-medium">Đã xác nhận</Badge>;
            case 'cancelled':
                return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none font-medium">Đã hủy</Badge>;
            default:
                return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none shadow-none font-medium">Chờ xử lý</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Quản lý Đặt bàn</h1>
                    <p className="text-slate-500 text-sm">Xem và quản lý các yêu cầu đặt bàn từ khách hàng.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Tìm tên hoặc SĐT..."
                            className="pl-9 w-full sm:w-64 bg-white"
                        />
                    </div>
                    {/* Placeholder for Date Range Picker - simple button for now */}
                    <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal border-slate-200">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Chọn ngày</span>
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-[200px]">Khách hàng</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead>Số khách</TableHead>
                            <TableHead className="max-w-[200px]">Ghi chú</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.key} className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900">{row.name}</span>
                                        <div className="flex items-center text-xs text-slate-500 mt-0.5">
                                            <Phone className="w-3 h-3 mr-1" />
                                            {row.phone}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-700">{dayjs(row.date).format('DD/MM/YYYY')}</span>
                                        <span className="text-xs text-slate-500">{row.time}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-slate-700">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">{row.guests}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[200px]">
                                    <span className="text-slate-500 text-sm truncate block" title={row.notes}>
                                        {row.notes || '-'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(row.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <TooltipProvider delayDuration={200}>
                                            {row.status === 'pending' && (
                                                <>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Xác nhận</TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50">
                                                                <XCircle className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Từ chối</TooltipContent>
                                                    </Tooltip>
                                                </>
                                            )}

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Xóa</TooltipContent>
                                            </Tooltip>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TooltipProvider>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
