"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, Plus, Edit, Trash2, FilterX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, Tag, Popconfirm, message, Space, Modal, Form, Input, Select, Button as AntButton, Switch } from "antd";
import type { InputRef, TableColumnType, TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const EventsPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [formEvent] = Form.useForm();
    const [categories, setCategories] = useState<any[]>([]);

    // --- Table Search & Filter State ---
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
    const searchInput = useRef<InputRef>(null);

    const router = useRouter();

    useEffect(() => {
        fetchEvents();
        fetchCategories();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/v1/events');
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            } else {
                messageApi.error("Failed to fetch events");
            }
        } catch (error) {
            console.error(error);
            messageApi.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/v1/event-categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    };

    const handleDeleteEvent = async (id: string) => {
        try {
            const res = await fetch(`/api/v1/events/${id}`, { method: 'DELETE' });
            if (res.ok) {
                messageApi.success("Đã xóa sự kiện");
                fetchEvents();
            } else {
                messageApi.error("Không thể xóa sự kiện");
            }
        } catch (error) {
            messageApi.error("Lỗi khi xóa sự kiện");
        }
    };

    const openCreateEventModal = () => {
        router.push('/admin/events/create');
    };

    const openEditEventModal = (record: any) => {
        router.push(`/admin/events/${record.id}`);
    };

    const handleToggleFeatured = async (id: string, checked: boolean) => {
        try {
            // First get the current event data
            const getRes = await fetch(`/api/v1/events/${id}`);
            if (!getRes.ok) {
                messageApi.error("Không thể lấy thông tin sự kiện");
                return;
            }
            const eventData = await getRes.json();

            // Update with isFeatured
            const res = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...eventData, isFeatured: checked }),
            });
            if (res.ok) {
                messageApi.success(checked ? "Đã đánh dấu nổi bật" : "Đã bỏ đánh dấu nổi bật");
                fetchEvents();
            } else {
                messageApi.error("Không thể cập nhật");
            }
        } catch (error) {
            messageApi.error("Lỗi khi cập nhật");
        }
    };

    const handleToggleHidden = async (id: string, checked: boolean) => {
        try {
            // First get the current event data
            const getRes = await fetch(`/api/v1/events/${id}`);
            if (!getRes.ok) {
                messageApi.error("Không thể lấy thông tin sự kiện");
                return;
            }
            const eventData = await getRes.json();

            // Update with isHidden
            const res = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...eventData, isHidden: checked }),
            });
            if (res.ok) {
                messageApi.success(checked ? "Đã ẩn sự kiện" : "Đã hiện sự kiện");
                fetchEvents();
            } else {
                messageApi.error("Không thể cập nhật");
            }
        } catch (error) {
            messageApi.error("Lỗi khi cập nhật");
        }
    };

    // --- Search & Filter Handlers ---
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

    const handleChange: TableProps<any>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const clearAllFilters = () => {
        setFilteredInfo({});
        setSearchText('');
        setSearchedColumn('');
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchedColumn('');
    };

    const clearCategory = () => {
        const newFilteredInfo = { ...filteredInfo };
        delete newFilteredInfo.category;
        setFilteredInfo(newFilteredInfo);
    };

    const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
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
                    <AntButton
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </AntButton>
                    <AntButton
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </AntButton>
                    <AntButton
                        type="link"
                        size="small"
                        onClick={() => { close(); }}
                    >
                        Đóng
                    </AntButton>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
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

    const columns = [
        {
            title: "HÌNH ẢNH",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                    <img src={image || "https://via.placeholder.com/150"} alt="event" className="w-full h-full object-cover" />
                </div>
            )
        },
        {
            title: "SỰ KIỆN",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps('title'),
            filteredValue: searchedColumn === 'title' && searchText ? [searchText] : null,
            render: (text: string) => <span className="font-bold text-slate-900">{text}</span>
        },
        {
            title: "DANH MỤC",
            dataIndex: "category",
            key: "category",
            filters: categories.map(c => ({ text: c.name, value: c.name })),
            filteredValue: filteredInfo.category || null,
            onFilter: (value: any, record: any) => record.category === value,
            render: (category: string) => <Tag color="blue">{category}</Tag>
        },
        {
            title: "THỜI GIAN",
            key: "schedule",
            render: (_: any, record: any) => (
                <div className="flex flex-col text-sm">
                    <span className="font-medium">{record.date}</span>
                    <span className="text-slate-500">{record.time}</span>
                </div>
            )
        },
        {
            title: "ĐỊA ĐIỂM",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "GIÁ VÉ",
            dataIndex: "priceDisplay",
            key: "priceDisplay",
            render: (priceDisplay: string) => <span className="font-medium text-slate-700">{priceDisplay}</span>
        },
        {
            title: "NỔI BẬT",
            dataIndex: "isFeatured",
            key: "isFeatured",
            align: 'center' as const,
            render: (isFeatured: boolean, record: any) => (
                <Switch
                    checked={isFeatured}
                    onChange={(checked) => handleToggleFeatured(record.id, checked)}
                    checkedChildren="✓"
                    unCheckedChildren=""
                />
            )
        },
        {
            title: "ẨN",
            dataIndex: "isHidden",
            key: "isHidden",
            align: 'center' as const,
            render: (isHidden: boolean, record: any) => (
                <Switch
                    checked={isHidden}
                    onChange={(checked) => handleToggleHidden(record.id, checked)}
                    checkedChildren="✓"
                    unCheckedChildren=""
                />
            )
        },
        {
            title: "",
            key: "action",
            align: 'right' as const,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-slate-100 rounded-full"
                        onClick={() => openEditEventModal(record)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa sự kiện này?"
                        onConfirm={() => handleDeleteEvent(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-500 rounded-full">
                            <Trash2 className="h-4 w-4 text-slate-400" />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {contextHolder}
            <div className="flex items-center justify-end">
                <Button className="gap-2 bg-green-500 hover:bg-green-600" onClick={openCreateEventModal}>
                    <Plus className="h-4 w-4" />
                    Thêm sự kiện
                </Button>
            </div>

            {/* --- ACTIVE FILTERS SUMMARY --- */}
            {(searchText || (filteredInfo.category && filteredInfo.category.length > 0)) && (
                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-slate-700">Đang lọc theo:</span>

                        {searchText && (
                            <Tag
                                closable
                                onClose={clearSearch}
                                className="flex items-center gap-1 bg-white border-blue-200 text-blue-700 m-0 py-1"
                            >
                                <span className="text-slate-500">Tên sự kiện:</span>
                                <span className="font-medium">"{searchText}"</span>
                            </Tag>
                        )}

                        {filteredInfo.category && filteredInfo.category.length > 0 && (
                            <Tag
                                closable
                                onClose={clearCategory}
                                className="flex items-center gap-1 bg-white border-orange-200 text-orange-700 m-0 py-1"
                            >
                                <span className="text-slate-500">Danh mục:</span>
                                <span className="font-medium">
                                    {(filteredInfo.category as string[]).join(", ")}
                                </span>
                            </Tag>
                        )}
                    </div>

                    <AntButton
                        type="dashed"
                        danger
                        size="small"
                        onClick={clearAllFilters}
                        icon={<FilterX className="h-3.5 w-3.5" />}
                        className="flex items-center gap-1 bg-white"
                    >
                        Xóa tất cả bộ lọc
                    </AntButton>
                </div>
            )}

            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={events}
                    rowKey="id"
                    loading={loading}
                    onChange={handleChange}
                    pagination={{
                        defaultPageSize: 8,
                        showSizeChanger: true,
                        pageSizeOptions: ['8', '16', '32'],
                        locale: { items_per_page: '/ trang' },
                        showTotal: (total) => <span className="absolute left-6 font-medium text-slate-500">Có tất cả {total} sự kiện</span>,
                        style: { paddingRight: '24px' },
                    }}
                    className="ant-table-custom"
                />
            </div>
        </div>
    );
};


export default EventsPage;
