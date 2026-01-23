"use client";
import React from 'react';
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
    {
        name: "Sunset Paradise",
        price: "150k",
        desc: "Rượu rum Phú Quốc pha trộn với nước ép dứa tươi và một chút siro lựu đỏ.",
        category: "Cocktails",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWsuoDuHB5NJbr6vJMqvF-as8CfC9DvGiI5OFaDJQRAKqF7doHlmQsPVAonFJdnTmwdx7lf8IpxsemEkyO-NvStuH3nNQTzWqp7F6kAsF8hZNlCdx4OYaZI7cj-KtIjwur772osY4Fo4YMFvZ6VBWzxXfz6mt_ebucLXy0dPFUw6KVek-2SJ-tEUN08KjCbOiouSq5cI9DMyy7l_tNi2gZG7YVSa3BUe7kSQCQwZ-SWuV8FjH1w_iEhBtawm2EMA2sawaPqty5gJc",
        status: "available"
    },
    {
        name: "Mực Nướng Muối Ớt",
        price: "220k",
        desc: "Mực tươi Phú Quốc nướng than hoa, ăn kèm sốt muối ớt xanh đặc biệt.",
        category: "Hải sản",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLqyf0hiAhkSOEBI4HBKIa5wBvcGNkiH469Old3qRZf9j_HimLKrkF2djgZGFJ3JnV7bj_JJSbgrIavggg1VW7ZWhMC9ny65Pp4U4v82nfkfBKTPWZniEHxPH9f7K4Ifm6Syn_HDW1UHJzFkU2kueFOnNC8TdyZ5qfObn70p_kzQh6OoMmyGCyGxLBTcL6G0u2TlUWgGT3-MZykXRSGa9_9_3nDWT6A59XrxOUuDMIRhM7P8mNy4IkVIUeUzAVexV2IVpjZmQjrJI",
        status: "available"
    },
    {
        name: "Blue Ocean Mojito",
        price: "135k",
        desc: "Hương vị bạc hà mát lạnh kết hợp với Curacao xanh, mang lại cảm giác biển cả.",
        category: "Cocktails",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfX5Jq4qcPry01s2C-Aft5gEt23DPGM08uSLSlhaiNHJZ9IbO3fYyyE_z65aq-GcdyoFIHkOsHkkzOjgftwJ4228Da3YmTO14pq7Be3HgozPdHq-NmH9TFnVkSGrl7PfisYtUsZZRQ4lRk5fUK2gLBl_bDhZ869RPoUPXBlAV26bBkg48yo7lIoMwA7Y6yQloDHQEtC22yChXRXhvFtAZ1BNsjh8BaXssuALXxu7cXoIA9TbYkCVsoartEsnfjusMCdFzzuYaM9sY",
        status: "out_of_stock"
    },
    {
        name: "Gỏi Cuốn Tôm",
        price: "95k",
        desc: "Món khai vị nhẹ nhàng với tôm tươi, bún và rau sống, chấm sốt đậu phộng.",
        category: "Đồ ăn nhẹ",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJA98lB63i7oJyF-b-6NXXxnnaFcft9yBcomfa29BR-iYWlTK5wbTCXhPK2VfkYKQMwH1FY96y_HtkOwYXML903zV_BHc9LDkkr5glUF-CQMabsQnVwH52lCMTUKfGxdtai6_nz6qVEgBFMiazBssBat8vYQu0yH8Ap-0wEV7Z8loWRqty6_5o5H7XNa4x3Bs5MdnLSguqi-q-drxQ5dEwkxf0a9OFgZkS5eNr_JYq3tKXqjAZKtO372Viujly0AjiIMLNcxiyjR8",
        status: "available"
    }
];

export default function AdminMenuPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Quản lý Thực đơn</h1>
                    <p className="text-slate-500 text-sm">Quản lý danh sách món ăn, thức uống và cập nhật trạng thái phục vụ.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Tìm kiếm món ăn..."
                            className="pl-9 bg-white"
                        />
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm món mới
                    </Button>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <Button variant="default" className="rounded-full shadow-none bg-primary text-primary-foreground hover:bg-primary/90">Tất cả</Button>
                <Button variant="ghost" className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">Cocktails</Button>
                <Button variant="ghost" className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">Mocktails</Button>
                <Button variant="ghost" className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">Đồ ăn</Button>
                <Button variant="ghost" className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">Hải sản</Button>
                <Button variant="outline" className="rounded-full border-dashed ml-auto text-slate-500 hover:text-slate-900">
                    <Filter className="w-4 h-4 mr-2" />
                    Bộ lọc khác
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems.map((item, idx) => (
                    <Card key={idx} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group bg-white">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url("${item.image}")` }}
                            ></div>
                            <div className="absolute top-3 right-3 flex gap-2">
                                {item.status === 'available' ? (
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur text-green-700 font-bold shadow-sm">Còn hàng</Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur text-red-600 font-bold shadow-sm">Hết hàng</Badge>
                                )}
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-900 truncate pr-2 w-full" title={item.name}>{item.name}</h3>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* Action buttons could go here overlaying the image, or in a menu */}
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-2 h-10 mb-3 leading-relaxed">{item.desc}</p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md text-sm">{item.price}</span>
                                <Badge variant="outline" className="text-slate-500 border-slate-200 font-normal">{item.category}</Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="p-2 border-t border-slate-50 bg-slate-50/50 gap-1">
                            <Button variant="ghost" size="sm" className="w-full text-slate-600 hover:text-primary hover:bg-white hover:shadow-sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full text-slate-600 hover:text-red-600 hover:bg-white hover:shadow-sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {/* Add New Placeholder Card */}
                <div role="button" className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl min-h-[350px] cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all gap-4 group bg-slate-50/50">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8 text-slate-300 group-hover:text-primary" />
                    </div>
                    <div className="text-center px-4">
                        <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Thêm món mới</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">Tạo món ăn hoặc đồ uống mới vào thực đơn của bạn</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
