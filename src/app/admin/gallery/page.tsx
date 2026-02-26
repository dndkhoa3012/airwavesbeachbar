"use client";

import React, { useState, useRef } from "react";
import { Button, Popconfirm, Table, Tag, Input, Space, Badge } from "antd";
import type { InputRef, TableColumnType, TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { Plus, Trash2, FilterX, Edit, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGallery, CollectionType } from "./hooks/useGallery";

export default function GalleryCollectionsPage() {
    const router = useRouter();
    const {
        collections,
        categories,
        loading,
        handleDelete,
        contextHolder
    } = useGallery();

    // Table Filter State
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
    const searchInput = useRef<InputRef>(null);

    // Table Handlers
    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: any,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleChange: TableProps<CollectionType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const clearAllFilters = () => {
        setFilteredInfo({});
        setSearchText('');
        setSearchedColumn('');
    };

    // Column Config
    const getColumnSearchProps = (dataIndex: any): TableColumnType<CollectionType> => ({
        filteredValue: filteredInfo[dataIndex] || null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => { close(); }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            (record as any)[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableProps<CollectionType>['columns'] = [
        {
            title: 'COVER',
            key: 'cover',
            width: 100,
            render: (_, record) => {
                const src = record.coverImage || (record.images && record.images.length > 0 ? record.images[0].src : null);
                return (
                    <div className="w-16 h-16 rounded overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                        {src ? (
                            <img src={src} alt="cover" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon className="text-slate-300" size={24} />
                        )}
                    </div>
                );
            }
        },
        {
            title: 'TÊN BỘ SƯU TẬP',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <div>
                    <div className="font-medium text-slate-800">{text}</div>
                    {record.description && (
                        <div className="text-xs text-slate-500 line-clamp-1">{record.description}</div>
                    )}
                </div>
            )
        },
        {
            title: 'DANH MỤC',
            dataIndex: ['category', 'name'],
            key: 'category',
            filters: categories.map(c => ({ text: c.name, value: c.name })),
            filteredValue: filteredInfo.category || null,
            onFilter: (value, record) => record.category?.name === value,
            render: (_, record) => (
                <Tag color={record.category?.color || "default"}>
                    {record.category?.name || "Chưa phân loại"}
                </Tag>
            )
        },
        {
            title: 'SỐ LƯỢNG ẢNH',
            key: 'count',
            align: 'center',
            render: (_, record) => (
                <Badge count={record._count?.images || 0} showZero color="#108ee9" />
            )
        },
        {
            title: 'NGÀY TẠO',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString('vi-VN'),
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: '',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<Edit size={16} />}
                        className="text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                        onClick={() => router.push(`/admin/gallery/${record.id}`)}
                    />
                    <Popconfirm
                        title="Xóa bộ sưu tập này?"
                        description="Hành động này sẽ xóa các ảnh bên trong."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            danger
                            type="text"
                            shape="circle"
                            icon={<Trash2 size={16} />}
                            className="text-slate-400 hover:text-red-500"
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {contextHolder}

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Thư viện ảnh</h1>
                    <p className="text-sm text-muted-foreground">Quản lý các bộ sưu tập ảnh hiển thị trên website</p>
                </div>
                <div className="flex gap-2">
                    {(searchText || (filteredInfo.category && filteredInfo.category.length > 0)) && (
                        <Button onClick={clearAllFilters} icon={<FilterX className="w-4 h-4" />}>
                            Xóa bộ lọc
                        </Button>
                    )}
                    <Button
                        type="primary"
                        icon={<Plus size={18} />}
                        onClick={() => router.push("/admin/gallery/create")}
                        className="bg-green-500 hover:bg-green-600 border-none h-10 px-6"
                    >
                        Thêm bộ sưu tập
                    </Button>
                </div>
            </div>

            {/* TABLE */}
            <div className="rounded-lg bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={collections}
                    rowKey="id"
                    loading={loading}
                    onChange={handleChange}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                        showTotal: (total) => `Tổng ${total} bộ sưu tập`
                    }}
                    className="ant-table-custom"
                />
            </div>
        </div>
    );
}
