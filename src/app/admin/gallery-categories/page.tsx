"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, Popconfirm, message, Space, Modal, Form, Input } from "antd";
import { getGalleryCategories, createGalleryCategory, updateGalleryCategory, deleteGalleryCategory } from "@/app/admin/gallery/gallery-categories.service";

const GalleryCategoriesPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formCategory] = Form.useForm();

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getGalleryCategories();
            setCategories(data);
        } catch (error) {
            messageApi.error("Không thể tải danh mục thư viện");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteGalleryCategory(id);
            messageApi.success("Đã xóa danh mục");
            fetchCategories();
        } catch (error: any) {
            messageApi.error(error.message || "Không thể xóa danh mục");
        }
    };

    const openCreateCategoryModal = () => {
        setEditingCategory(null);
        formCategory.resetFields();
        setIsCategoryModalOpen(true);
    };

    const openEditCategoryModal = (record: any) => {
        setEditingCategory(record);
        formCategory.setFieldsValue(record);
        setIsCategoryModalOpen(true);
    };

    const handleSaveCategory = async (values: any) => {
        try {
            if (editingCategory) {
                await updateGalleryCategory(editingCategory.id, values);
                messageApi.success("Đã cập nhật danh mục");
            } else {
                await createGalleryCategory(values);
                messageApi.success("Đã thêm danh mục mới");
            }
            setIsCategoryModalOpen(false);
            formCategory.resetFields();
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            messageApi.error("Có lỗi xảy ra");
        }
    };

    const categoryColumns = [
        {
            title: "TÊN DANH MỤC",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span className="font-medium">{text}</span>
        },
        {
            title: "MÔ TẢ",
            dataIndex: "description",
            key: "description",
            render: (text: string) => <span className="text-gray-500">{text || "-"}</span>
        },
        {
            title: "SỐ LƯỢNG BỘ SƯU TẬP",
            key: "count",
            render: (_: any, record: any) => {
                return <span className="font-semibold text-slate-600 ml-4">{record._count?.collections || 0}</span>;
            }
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
                        onClick={() => openEditCategoryModal(record)}
                    >
                        <Edit className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Popconfirm
                        title="Xóa danh mục này?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
                <h1 className="text-2xl font-bold tracking-tight">Danh mục Thư viện</h1>
                <Button className="gap-2 bg-green-500 hover:bg-green-600" onClick={openCreateCategoryModal}>
                    <Plus className="h-4 w-4" />
                    Thêm danh mục
                </Button>
            </div>

            <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
                <Table
                    columns={categoryColumns}
                    dataSource={categories}
                    rowKey="id"
                    pagination={false}
                    className="ant-table-custom"
                    loading={loading}
                />
            </div>

            {/* Create/Edit Category Modal */}
            <Modal
                title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục thư viện mới"}
                open={isCategoryModalOpen}
                onCancel={() => setIsCategoryModalOpen(false)}
                footer={null}
            >
                <Form
                    form={formCategory}
                    layout="vertical"
                    onFinish={handleSaveCategory}
                    className="mt-4"
                >
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input placeholder="Ví dụ: Wedding, Party, Food..." />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <Input.TextArea placeholder="Mô tả ngắn gọn về danh mục này" />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Hủy</Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                            {editingCategory ? "Cập nhật" : "Lưu danh mục"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default GalleryCategoriesPage;
