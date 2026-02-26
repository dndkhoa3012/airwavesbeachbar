"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, Card, Space, App } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";
import { getGalleryCategories } from "../gallery-categories.service";

const CreateGalleryContent = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getGalleryCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    };

    const handleSave = async (values: any) => {
        if (images.length === 0) {
            message.warning("Vui lòng tải lên ít nhất 1 ảnh");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...values,
                images: images
            };

            const res = await fetch('/api/v1/gallery-collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                message.success("Tạo bộ sưu tập thành công");
                router.push("/admin/gallery");
            } else {
                message.error("Có lỗi xảy ra khi tạo bộ sưu tập");
            }
        } catch (error) {
            console.error('Create gallery failed:', error);
            message.error("Lỗi kết nối");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold m-0">Tạo bộ sưu tập mới</h1>
                </div>
                <Space>
                    <Button onClick={() => router.push("/admin/gallery")}>Hủy</Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        loading={loading}
                        className="bg-green-500 hover:bg-green-600 border-none"
                    >
                        Lưu
                    </Button>
                </Space>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="name"
                            label="Tên bộ sưu tập"
                            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                        >
                            <Input placeholder="Ví dụ: Tiệc cưới Anna & James" />
                        </Form.Item>

                        <Form.Item
                            name="categoryId"
                            label="Danh mục"
                            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                        >
                            <Select
                                placeholder="Chọn danh mục"
                                options={categories.map(c => ({ label: c.name, value: c.id }))}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={2} placeholder="Mô tả ngắn về bộ sưu tập này..." />
                    </Form.Item>

                    <div className="mb-4">
                        <ImageUploadGrid
                            value={images}
                            onChange={setImages}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

const CreateGalleryPage = () => (
    <App>
        <CreateGalleryContent />
    </App>
);

export default CreateGalleryPage;
