"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, Popconfirm, message, Space, Switch } from "antd";
import { getBanners, updateBanner, deleteBanner } from "./banner.service";

const PAGE_TYPE_LABELS: Record<string, string> = {
    HOME: "Trang chủ",
    MENU: "Thực đơn",
    EVENTS: "Sự kiện",
};

const BannerPage = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const data = await getBanners('HOME'); // Only fetch HOME banners
            setBanners(data);
        } catch (error) {
            messageApi.error("Không thể tải danh sách banner");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDeleteBanner = async (id: string) => {
        try {
            await deleteBanner(id);
            messageApi.success("Đã xóa banner");
            fetchBanners();
        } catch (error: any) {
            messageApi.error(error.message || "Không thể xóa banner");
        }
    };

    const handleToggleActive = async (id: string, checked: boolean) => {
        try {
            await updateBanner(id, { isActive: checked });
            messageApi.success(checked ? "Đã kích hoạt banner" : "Đã tắt banner");
            fetchBanners();
        } catch (error) {
            messageApi.error("Không thể cập nhật");
        }
    };


    const bannerColumns = [
        {
            title: "HÌNH ẢNH",
            dataIndex: "imageUrls",
            key: "imageUrls",
            width: 200,
            render: (imageUrls: any) => {
                const urls = Array.isArray(imageUrls) ? imageUrls : [];
                return (
                    <div className="flex items-center gap-2">
                        {urls.length > 0 ? (
                            <>
                                <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                                    <img src={urls[0]} alt="banner" className="w-full h-full object-cover" />
                                </div>
                                {urls.length > 1 && (
                                    <span className="text-xs text-gray-500">
                                        +{urls.length - 1}
                                    </span>
                                )}
                            </>
                        ) : (
                            <div className="w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                                <span className="text-xs text-gray-400">Không có ảnh</span>
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            title: "TRANG",
            dataIndex: "pageType",
            key: "pageType",
            render: (pageType: string) => (
                <span className="font-medium text-slate-700">{PAGE_TYPE_LABELS[pageType]}</span>
            ),
        },
        {
            title: "TIÊU ĐỀ",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <span className="font-medium">{text || "-"}</span>,
        },
        {
            title: "PHỤ ĐỀ",
            dataIndex: "subtitle",
            key: "subtitle",
            render: (text: string) => <span className="text-gray-500 text-sm line-clamp-2">{text || "-"}</span>,
        },
        {
            title: "THỨ TỰ",
            dataIndex: "order",
            key: "order",
            align: 'center' as const,
            width: 100,
            render: (order: number) => <span className="font-semibold text-slate-600">{order}</span>,
        },
        {
            title: "KÍCH HOẠT",
            dataIndex: "isActive",
            key: "isActive",
            align: 'center' as const,
            width: 120,
            render: (isActive: boolean, record: any) => (
                <Switch
                    checked={isActive}
                    onChange={(checked) => handleToggleActive(record.id, checked)}
                    checkedChildren="✓"
                    unCheckedChildren=""
                />
            ),
        },
        {
            title: "",
            key: "action",
            align: 'right' as const,
            width: 120,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-slate-100 rounded-full"
                        onClick={() => router.push(`/admin/home/banner/${record.id}`)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa banner này?"
                        onConfirm={() => handleDeleteBanner(record.id)}
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
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Quản lý Banner</h1>
                <Button
                    className="gap-2 bg-green-500 hover:bg-green-600"
                    onClick={() => router.push("/admin/home/banner/create")}
                >
                    <Plus className="h-4 w-4" />
                    Thêm banner
                </Button>
            </div>

            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={bannerColumns}
                    dataSource={banners}
                    rowKey="id"
                    pagination={false}
                    className="ant-table-custom"
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default BannerPage;
