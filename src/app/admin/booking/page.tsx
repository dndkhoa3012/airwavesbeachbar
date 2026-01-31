"use client";

import React, { useState, useEffect, useRef } from "react";
import { Table, message, Popconfirm, Modal, Descriptions, Tag, Divider, Row, Col, Input, Select, Space, Button as AntButton } from "antd";
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {
    MoreVertical,
    Check,
    X,
    FileText,
    CheckCircle2,
    Trash2,
    Eye,
    FilterX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BookingPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // View Modal State
    const [viewBooking, setViewBooking] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
    const [sortedInfo, setSortedInfo] = useState<any>({});

    // Column Search State
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    useEffect(() => {

        fetchBookings();

        // Auto-refresh every 5 seconds
        const interval = setInterval(() => {
            fetchBookings(true);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const fetchBookings = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const res = await fetch('/api/v1/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            } else {
                if (!silent) messageApi.error("Failed to fetch bookings");
            }
        } catch (error) {
            console.error(error);
            if (!silent) messageApi.error("Error connecting to server");
        } finally {
            if (!silent) setLoading(false);
        }
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record: any) => ({
            disabled: record.status === 'cancelled' || record.status === 'deleted',
            style: { display: (record.status === 'cancelled' || record.status === 'deleted') ? 'none' : undefined },
        }),
    };

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearAllFilters = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchText('');
        setSearchedColumn('');
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchedColumn('');
    };

    const clearStatus = () => {
        const newFilters = { ...filteredInfo };
        delete newFilters.status;
        setFilteredInfo(newFilters);
    };

    // Handler Actions


    const handleView = (record: any) => {
        setViewBooking(record);
        setIsViewModalOpen(true);
    };

    const handleDeleteBooking = async (id: string) => {
        try {
            const res = await fetch(`/api/v1/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                messageApi.success("Đã xóa đặt bàn");
                fetchBookings();
            } else {
                messageApi.error("Xóa thất bại");
            }
        } catch (error) {
            messageApi.error("Lỗi khi xóa");
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/v1/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                messageApi.success("Cập nhật trạng thái thành công");
                fetchBookings();
            } else {
                messageApi.error("Cập nhật thất bại");
            }
        } catch (error) {
            messageApi.error("Lỗi kết nối");
        }
    };

    const handleBulkAction = async (action: 'confirm' | 'cancel' | 'delete') => {
        if (selectedRowKeys.length === 0) return;

        try {
            if (action === 'delete') {
                await Promise.all(selectedRowKeys.map(key =>
                    fetch(`/api/v1/bookings/${key}`, { method: 'DELETE' })
                ));
                messageApi.success(`Đã xóa ${selectedRowKeys.length} đặt bàn`);
            } else {
                const newStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
                await Promise.all(selectedRowKeys.map(key =>
                    fetch(`/api/v1/bookings/${key}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: newStatus }),
                    })
                ));
                messageApi.success(`Đã cập nhật ${selectedRowKeys.length} đặt bàn`);
            }
            fetchBookings();
            setSelectedRowKeys([]);
        } catch (error) {
            messageApi.error("Có lỗi xảy ra khi thực hiện thao tác hàng loạt");
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50 flex gap-2 items-center w-fit px-3 py-1"
                    >
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="text-sm font-medium">Chờ xác nhận</span>
                    </Badge>
                );
            case "confirmed":
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 flex gap-2 items-center w-fit px-3 py-1"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium">Đã xác nhận</span>
                    </Badge>
                );
            case "cancelled":
                return (
                    <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100 flex gap-2 items-center w-fit px-3 py-1"
                    >
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="text-sm font-medium">Đã hủy</span>
                    </Badge>
                );
            case "deleted":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-50 flex gap-2 items-center w-fit px-3 py-1"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-sm font-medium">Đã xóa</span>
                    </Badge>
                );
            default:
                return null;
        }
    };

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

    const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm...`}
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
                        style={{ width: 90, backgroundColor: '#22c55e', borderColor: '#22c55e' }}
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
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </AntButton>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            if (dataIndex === 'customer') {
                return record.customer?.name?.toString().toLowerCase().includes((value as string).toLowerCase()) ||
                    record.customer?.phone?.toString().toLowerCase().includes((value as string).toLowerCase()) ||
                    record.customer?.email?.toString().toLowerCase().includes((value as string).toLowerCase());
            }
            return record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase());
        },
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
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
            title: "KHÁCH HÀNG",
            dataIndex: "customer",
            key: "customer",
            ...getColumnSearchProps('customer'),
            filteredValue: searchedColumn === 'customer' ? [searchText] : null,
            render: (customer: any) => (
                <div>
                    <div className="font-semibold text-sm">
                        {searchedColumn === 'customer' ? (
                            <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[searchText]}
                                autoEscape
                                textToHighlight={customer?.name ? customer.name.toString() : ''}
                            />
                        ) : (
                            customer?.name
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {searchedColumn === 'customer' ? (
                            <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[searchText]}
                                autoEscape
                                textToHighlight={customer?.phone ? customer.phone.toString() : ''}
                            />
                        ) : (
                            customer?.phone
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {searchedColumn === 'customer' ? (
                            <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[searchText]}
                                autoEscape
                                textToHighlight={customer?.email ? customer.email.toString() : ''}
                            />
                        ) : (
                            customer?.email
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: "THỜI GIAN",
            key: "time",
            sorter: (a: any, b: any) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime(),
            sortOrder: sortedInfo.columnKey === 'time' ? sortedInfo.order : null,
            render: (_: any, record: any) => (
                <div>
                    <div className="font-medium text-sm">{record.date}</div>
                    <div className="text-xs text-muted-foreground">{record.time}</div>
                </div>
            ),
        },
        {
            title: "SỐ KHÁCH",
            dataIndex: "guests",
            key: "guests",
            sorter: (a: any, b: any) => a.guests - b.guests,
            sortOrder: sortedInfo.columnKey === 'guests' ? sortedInfo.order : null,
            render: (guests: number) => (
                <Badge variant="secondary" className="font-normal bg-gray-100">
                    {guests} người
                </Badge>
            ),
        },
        {
            title: "KHU VỰC",
            dataIndex: "area",
            key: "area",
            ...getColumnSearchProps('area'),
            filteredValue: searchedColumn === 'area' ? [searchText] : null,
            render: (area: string) => <span className="text-sm">{area}</span>,
        },
        {
            title: "GHI CHÚ",
            dataIndex: "note",
            key: "note",
            ...getColumnSearchProps('note'),
            filteredValue: searchedColumn === 'note' ? [searchText] : null,
            render: (note: string) => (
                <span className="text-sm text-muted-foreground block max-w-[200px] truncate">
                    {note}
                </span>
            ),
        },
        {
            title: "TRẠNG THÁI",
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            filters: [
                { text: 'Chờ xác nhận', value: 'pending' },
                { text: 'Đã xác nhận', value: 'confirmed' },
                { text: 'Đã hủy', value: 'cancelled' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value: any, record: any) => record.status === value,
            render: (status: string) => (
                <div className="flex justify-center">{getStatusBadge(status)}</div>
            ),
        },
        {
            title: "HÀNH ĐỘNG",
            key: "action",
            align: "right" as const,
            render: (_: any, record: any) => (
                <div className="flex items-center justify-end gap-2">
                    {record.status === "pending" && (
                        <>
                            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleUpdateStatus(record.id, 'confirmed')} title="Xác nhận">
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleUpdateStatus(record.id, 'cancelled')} title="Hủy">
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    {record.status === "confirmed" && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 cursor-default hover:bg-transparent">
                            <CheckCircle2 className="h-4 w-4" />
                        </Button>
                    )}

                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-blue-600 hover:bg-blue-50"
                        onClick={() => handleView(record)}
                        title="Xem chi tiết"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-6">
            {contextHolder}

            {/* Stats Cards */}
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-2 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                                <FileText className="h-4 w-4" />
                            </div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Tổng đơn</p>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{bookings.length}</h3>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-2 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-md">
                                <MoreVertical className="h-4 w-4 rotate-90" />
                            </div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Chờ xử lý</p>
                        </div>
                        <h3 className="text-2xl font-bold text-yellow-600">
                            {bookings.filter((b: any) => b.status === "pending").length}
                        </h3>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-2 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-50 text-green-600 rounded-md">
                                <Check className="h-4 w-4" />
                            </div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Đã xác nhận</p>
                        </div>
                        <h3 className="text-2xl font-bold text-green-600">
                            {bookings.filter((b: any) => b.status === "confirmed").length}
                        </h3>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-2 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-red-50 text-red-600 rounded-md">
                                <X className="h-4 w-4" />
                            </div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Đã hủy</p>
                        </div>
                        <h3 className="text-2xl font-bold text-red-600">
                            {bookings.filter((b: any) => ["cancelled", "deleted"].includes(b.status)).length}
                        </h3>
                    </CardContent>
                </Card>
            </div>

            {/* Active Filters Summary */}
            {(searchText || (filteredInfo.status && filteredInfo.status.length > 0)) && (
                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-slate-700">Đang lọc theo:</span>

                        {searchText && (
                            <Tag
                                closable
                                onClose={clearSearch}
                                className="flex items-center gap-1 bg-white border-blue-200 text-blue-700 m-0 py-1"
                            >
                                <span className="text-slate-500">{searchedColumn === 'customer' ? 'Khách hàng' : searchedColumn === 'area' ? 'Khu vực' : 'Ghi chú'}:</span>
                                <span className="font-medium">"{searchText}"</span>
                            </Tag>
                        )}

                        {filteredInfo.status && filteredInfo.status.length > 0 && (
                            <Tag
                                closable
                                onClose={clearStatus}
                                className="flex items-center gap-1 bg-white border-orange-200 text-orange-700 m-0 py-1"
                            >
                                <span className="text-slate-500">Trạng thái:</span>
                                <span className="font-medium">
                                    {(filteredInfo.status as string[]).map(status => {
                                        const map: any = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', cancelled: 'Đã hủy', deleted: 'Đã xóa' };
                                        return map[status] || status;
                                    }).join(", ")}
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

            {/* Booking Table */}
            <div className="rounded-lg bg-white shadow-sm border overflow-hidden">
                {selectedRowKeys.length > 0 && (
                    <div className="p-4 border-b flex items-center justify-between bg-blue-50/50">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-700 font-medium">Đã chọn {selectedRowKeys.length} đơn đặt bàn</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800" onClick={() => handleBulkAction('confirm')}>
                                <Check className="w-4 h-4 mr-1" /> Xác nhận
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800" onClick={() => handleBulkAction('cancel')}>
                                <X className="w-4 h-4 mr-1" /> Hủy
                            </Button>
                        </div>
                    </div>
                )}
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={bookings}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 8,
                        showSizeChanger: true,
                        pageSizeOptions: ['8', '16', '32'],
                        style: { marginRight: '24px' }
                    }}
                    className="ant-table-custom"
                    rowClassName={(record) => record.status === 'deleted' ? 'bg-gray-50 opacity-60 [&_td]:line-through [&_span]:line-through [&_div]:line-through text-gray-500' : ''}
                    onChange={handleChange}
                />
            </div>

            {/* View Modal */}
            <Modal
                title={
                    <div className="flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Chi tiết đặt bàn {viewBooking?.id && <span className="text-muted-foreground text-base font-normal">#{viewBooking.id.slice(0, 8)}</span>}
                    </div>
                }
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalOpen(false)}>
                        Đóng
                    </Button>
                ]}
                width={800}
                centered
            >
                {viewBooking && (
                    <div className="space-y-6 py-4">
                        {/* Status Header */}
                        <div className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Trạng thái hiện tại</div>
                                <div>{getStatusBadge(viewBooking.status)}</div>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="text-sm text-muted-foreground">Ngày đặt</div>
                                <div className="font-medium text-base">{viewBooking.date} - {viewBooking.time}</div>
                            </div>
                        </div>

                        <Divider className="my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Customer Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                    Thông tin khách hàng
                                </h3>
                                <Descriptions column={1} size="small" className="bg-white">
                                    <Descriptions.Item label="Họ tên">
                                        <div className="flex items-center gap-2 font-medium">
                                            {viewBooking.customer?.name}
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Số điện thoại">
                                        <span className="font-medium">{viewBooking.customer?.phone}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Email">
                                        {viewBooking.customer?.email || "Chưa cập nhật"}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                                    Thông tin đặt bàn
                                </h3>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Số lượng khách">
                                        <Badge variant="secondary" className="font-medium">
                                            {viewBooking.guests} người
                                        </Badge>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Khu vực">
                                        {viewBooking.area ? (
                                            <span className="font-medium">{viewBooking.area}</span>
                                        ) : (
                                            <span className="text-gray-400 italic">Chưa chọn khu vực</span>
                                        )}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ghi chú">
                                        {viewBooking.note ? (
                                            <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded text-sm">
                                                {viewBooking.note}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 italic">Không có ghi chú</span>
                                        )}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>

                        {/* Action Log Placeholder (Optional) */}
                        {/* <div className="pt-4 border-t">
                            <p className="text-xs text-muted-foreground italic text-center">
                                Đặt bàn được tạo lúc {viewBooking.createdAt}
                            </p>
                        </div> */}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BookingPage;
