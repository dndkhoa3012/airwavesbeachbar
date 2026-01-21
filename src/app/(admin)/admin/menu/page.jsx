"use client";
import React from 'react';
import { Button, Input, Card, Tag, Tooltip } from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    FilterOutlined
} from '@ant-design/icons';

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
                    <h1 className="text-2xl font-bold text-slate-800">Quản lý Thực đơn</h1>
                    <p className="text-slate-500">Quản lý danh sách món ăn, thức uống và cập nhật trạng thái phục vụ.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Input prefix={<SearchOutlined className="text-slate-400" />} placeholder="Tìm kiếm món ăn..." className="w-full md:w-64" />
                    <Button type="primary" icon={<PlusOutlined />} className="bg-green-500 hover:bg-green-600">Thêm món mới</Button>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                <Button type="primary" className="bg-slate-800">Tất cả</Button>
                <Button>Cocktails</Button>
                <Button>Mocktails</Button>
                <Button>Đồ ăn</Button>
                <Button>Hải sản</Button>
                <Button icon={<FilterOutlined />}>Bộ lọc khác</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems.map((item, idx) => (
                    <Card
                        key={idx}
                        hoverable
                        cover={
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                <div className="absolute top-3 right-3">
                                    {item.status === 'available' ? (
                                        <Tag color="success" className="m-0 bg-white/90 backdrop-blur border-none font-bold text-green-600">Còn hàng</Tag>
                                    ) : (
                                        <Tag color="error" className="m-0 bg-white/90 backdrop-blur border-none font-bold text-red-600">Hết hàng</Tag>
                                    )}
                                </div>
                            </div>
                        }
                        actions={[
                            <Tooltip title="Chỉnh sửa"><EditOutlined key="edit" /></Tooltip>,
                            <Tooltip title="Xóa"><DeleteOutlined key="delete" className="hover:text-red-500" /></Tooltip>
                        ]}
                        className="overflow-hidden rounded-xl border-slate-200 shadow-sm"
                        bodyStyle={{ padding: '16px' }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-slate-800 truncate pr-2" title={item.name}>{item.name}</h3>
                            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{item.price}</span>
                        </div>
                        <p className="text-slate-500 text-sm line-clamp-2 h-10 mb-2">{item.desc}</p>
                        <Tag className="bg-slate-100 text-slate-500 border-none">{item.category}</Tag>
                    </Card>
                ))}

                {/* Add New Placeholer Card */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl min-h-[300px] cursor-pointer hover:border-green-400 hover:bg-green-50/30 transition-all gap-4 group">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                        <PlusOutlined className="text-2xl text-slate-300 group-hover:text-green-500" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-700 group-hover:text-green-600">Thêm món mới</p>
                        <p className="text-xs text-slate-400">Tạo món ăn hoặc đồ uống mới</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
