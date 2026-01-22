"use client";
import React, { useState } from 'react';
import { Table, Tag, Space, Button, Tooltip, Input, DatePicker } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    SearchOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

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

    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <div className="font-bold text-slate-700">{text}</div>
                    <div className="text-xs text-slate-500">{record.phone}</div>
                </div>
            ),
        },
        {
            title: 'Thời gian',
            key: 'datetime',
            render: (_, record) => (
                <div>
                    <div className="font-medium text-slate-700">{dayjs(record.date).format('DD/MM/YYYY')}</div>
                    <div className="text-xs text-slate-500">{record.time}</div>
                </div>
            ),
        },
        {
            title: 'Số khách',
            dataIndex: 'guests',
            key: 'guests',
            render: (guests) => <span className="font-medium">{guests} người</span>,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'notes',
            key: 'notes',
            render: (notes) => <span className="text-slate-500 text-sm truncate max-w-[200px] block" title={notes}>{notes || '-'}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'geekblue';
                let text = 'Chờ xử lý';
                if (status === 'confirmed') {
                    color = 'success';
                    text = 'Đã xác nhận';
                } else if (status === 'cancelled') {
                    color = 'error';
                    text = 'Đã hủy';
                }
                return (
                    <Tag color={color} key={status}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === 'pending' && (
                        <>
                            <Tooltip title="Xác nhận">
                                <Button
                                    type="text"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    icon={<CheckCircleOutlined />}
                                />
                            </Tooltip>
                            <Tooltip title="Hủy bỏ">
                                <Button
                                    type="text"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    icon={<CloseCircleOutlined />}
                                />
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Quản lý Đặt bàn</h1>
                    <p className="text-slate-500">Xem và quản lý các yêu cầu đặt bàn từ khách hàng.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Input prefix={<SearchOutlined className="text-slate-400" />} placeholder="Tìm tên hoặc SĐT..." className="w-full md:w-64" />
                    <RangePicker placeholder={['Từ ngày', 'Đến ngày']} className="w-full md:w-auto" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    rowClassName="align-middle"
                />
            </div>
        </div>
    );
}
