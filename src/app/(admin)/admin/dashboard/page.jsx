"use client";
import React from 'react';
import {
    ArrowUp,
    ArrowDown,
    Table as TableIcon,
    DollarSign,
    Users,
    FileText,
    Download,
    MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const topDishes = [
    {
        key: '1',
        name: 'Sunset Cocktail Signature',
        type: 'Đồ uống',
        price: '185.000₫',
        sold: 128,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmjUA-34iQrxLvr_H6LaH2h6aPIw8yfzn8foEVio8lyRRQX_zkrErKgLH6A4Kdvt5LapYB--rL31oQf108biapnP9JhFJwRoe6K1eaxaDZplVHLUjBZ1VzDOacGoIAlJ1HAdFUv9Xbza1XxfL8As4V87I5ZX6AUJKSM4awJgPxwjfIkl-LDY1umqjJ9BU-SfwYQQQT5l8HM-CWMuUwsuhEeYMUAgDh_4TVh3SIp-zeh_8V1hk5A1LICMHp2BKDxKuP-wIlXkZ5Wgc'
    },
    {
        key: '2',
        name: 'Combo Hải Sản Nướng',
        type: 'Đồ ăn',
        price: '450.000₫',
        sold: 84,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY1PJrN7dXte0MnlMfDiXjkFYVLamo3beypfK5AtmWTIWIPvWbL3sEbI8FIVFMbFfo9aDbybjBJbT9CbJbsNBjIPmYLI43qQKpiOoK5sVDkUfiJPoxCL-YL_mJ54v5vWEGeeCa1Z7_mTSu1K01ArWu0J7qcDEApcSu80EjDHoSJh-smESj2jZR0eZemWbBSnXFnXSXvkx6kle6RgL3aiqs2hI2dKQCBStte0zSaX-S43N5O39I5vs9O9fe2_VaGfOfohmGxdnGk6w'
    },
    {
        key: '3',
        name: 'Bia Tươi Phú Quốc',
        type: 'Đồ uống',
        price: '65.000₫',
        sold: 342,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_J_FmJCXmBfKiAolDOf2icpl7zaZxsdMrpjnnRqwyo6rv2_PXtuH674KqgScLtb_a9W-omlZTGM2H8n5YtHBFAUbEqtrSdKyqzKoa42_EtaPctMC_ih7h4TWm4DHJI97c4eqo6rDt2NLbjHSf_Qba_y-vfI5erC-qQ_vqP_9aWEYb2dQ33-tYWhi2gBYz-JmLg7VdkAcX6NI_pieOxtxFbJRWguMIZOoccmq8nQbGaWbwmzTB2vLthCU-ZSKoBQ2Qr-jHMDMzSOQ'
    }
];

const activities = [
    { user: 'Nguyễn Văn A', action: 'đặt bàn mới', detail: '#BK-2093', time: 'Vừa xong', type: 'marketing' },
    { user: 'System', action: 'Đơn hàng đã hoàn thành', detail: '#ORD-4492', time: '15 phút trước', type: 'success' },
    { user: 'Nhân viên kho', action: 'đã cập nhật số lượng nhập bia Tiger', detail: '', time: '32 phút trước', type: 'warning' },
    { user: 'Hệ thống', action: 'tự động sao lưu dữ liệu', detail: '', time: '1 giờ trước', type: 'info' }
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-slate-500">Đặt bàn mới</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-600 hover:bg-green-100">
                                <ArrowUp className="w-3 h-3 mr-1" /> 20%
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <TableIcon className="w-6 h-6" />
                            </div>
                            <div className="text-2xl font-bold">12</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-slate-500">Doanh thu ước tính</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-600 hover:bg-green-100">
                                <ArrowUp className="w-3 h-3 mr-1" /> 12%
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">15.2<span className="text-sm font-normal text-slate-400 ml-1">tr</span></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-slate-500">Khách đang truy cập</p>
                            <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-100">
                                <ArrowDown className="w-3 h-3 mr-1" /> 5%
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="text-2xl font-bold">85</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-slate-500">Đơn chờ xử lý</p>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="text-2xl font-bold">4</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm border-none bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-bold">Doanh thu 7 ngày qua</CardTitle>
                        <Select defaultValue="week">
                            <SelectTrigger className="w-[120px] h-8 bg-slate-50 border-none">
                                <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">Tuần này</SelectItem>
                                <SelectItem value="month">Tháng này</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-slate-50/50 rounded-xl flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-100">
                            [Biểu đồ doanh thu - Recharts Placeholer]
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-none bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Lượt khách theo giờ</CardTitle>
                        <CardDescription>Giờ cao điểm: <span className="font-bold text-slate-800">21:00 - 22:30</span></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-end justify-between gap-2 px-2 pb-4">
                            {[40, 60, 85, 100, 90, 70].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="w-full bg-slate-100 rounded-t-sm hover:bg-primary/80 transition-colors relative group cursor-pointer"
                                >
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between text-slate-400 text-xs mt-2 border-t border-slate-100 pt-2">
                            <span>18h</span><span>19h</span><span>20h</span><span>21h</span><span>22h</span><span>23h</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Report Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">Báo cáo doanh thu chi tiết</h3>
                    <p className="text-slate-500 text-sm">Phân tích hiệu suất kinh doanh theo thời gian thực</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="10">
                        <SelectTrigger className="w-[150px] bg-slate-50">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">Tháng 10/2023</SelectItem>
                            <SelectItem value="9">Tháng 9/2023</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Xuất dữ liệu
                    </Button>
                </div>
            </div>

            {/* Progress Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-50/50 border-none shadow-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500 text-sm">Doanh thu hôm nay</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">+8.5%</Badge>
                        </div>
                        <div className="text-2xl font-bold mb-3">18.500.000₫</div>
                        <Progress value={65} className="h-2 bg-slate-200" indicatorClassName="bg-primary" />
                    </CardContent>
                </Card>
                <Card className="bg-slate-50/50 border-none shadow-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500 text-sm">Tuần này</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">+12.4%</Badge>
                        </div>
                        <div className="text-2xl font-bold mb-3">142.800.000₫</div>
                        <Progress value={78} className="h-2 bg-slate-200" indicatorClassName="bg-blue-500" />
                    </CardContent>
                </Card>
                <Card className="bg-slate-50/50 border-none shadow-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500 text-sm">Tháng này</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">+5.2%</Badge>
                        </div>
                        <div className="text-2xl font-bold mb-3">580.450.000₫</div>
                        <Progress value={45} className="h-2 bg-slate-200" indicatorClassName="bg-indigo-500" />
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Dishes */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-bold">Món bán chạy nhất</CardTitle>
                        <Button variant="link" size="sm" className="text-primary">Xem tất cả</Button>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {topDishes.map(dish => (
                            <div key={dish.key} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-slate-100" style={{ backgroundImage: `url('${dish.image}')` }}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{dish.name}</div>
                                    <div className="text-slate-500 text-xs truncate">{dish.type} • {dish.price}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">{dish.sold}</div>
                                    <div className="text-[10px] text-slate-400">đã bán</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Activities */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Hoạt động gần đây</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-4 border-l border-slate-200 ml-2 space-y-6">
                            {activities.map((act, idx) => (
                                <div key={idx} className="relative group">
                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white transition-all ${idx === 0 ? 'bg-green-500 shadow-md scale-110' : 'bg-slate-300 group-hover:bg-slate-400'}`}></div>
                                    <div className="text-xs text-slate-400 mb-0.5">{act.time}</div>
                                    <div className="text-sm text-slate-700">
                                        <span className="font-semibold text-slate-900">{act.user}</span> {act.action} <span className="font-semibold text-primary">{act.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6">Xem tất cả hoạt động</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
