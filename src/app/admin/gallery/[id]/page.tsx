"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Select, message, Spin, Space, App } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";
import { getGalleryCategories } from "../gallery-categories.service";

const EditGalleryContent = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [form] = Form.useForm();
    const { message } = App.useApp(); // Use hook

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [initialImages, setInitialImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const cats = await getGalleryCategories();
                setCategories(cats);

                // Fetch Collection Details
                if (id) {
                    const res = await fetch(`/api/v1/gallery-collections/${id}`, { cache: 'no-store' });
                    if (res.ok) {
                        const data = await res.json();

                        form.setFieldsValue({
                            name: data.name,
                            categoryId: data.categoryId,
                            description: data.description
                        });

                        const imgUrls = data.images ? data.images.map((img: any) => img.src) : [];
                        setImages(imgUrls);
                        setInitialImages(imgUrls);
                    } else {
                        message.error("Không tìm thấy bộ sưu tập");
                        router.push("/admin/gallery");
                    }
                }
            } catch (error) {
                console.error("Failed to load data", error);
                message.error("Lỗi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, form, router, message]);

    const handleSave = async (values: any) => {
        setSubmitting(true);
        try {
            const payload = {
                ...values,
                images: images
            };

            const res = await fetch(`/api/v1/gallery-collections/${id}`, {
                method: 'PUT', // Route uses PUT for updates
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                message.success("Cập nhật bộ sưu tập thành công");
                router.push("/admin/gallery");
            } else {
                message.error("Có lỗi xảy ra khi cập nhật");
            }
        } catch (error) {
            console.error('Update gallery failed:', error);
            message.error("Lỗi kết nối");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold m-0">Chỉnh sửa bộ sưu tập</h1>
                </div>
                <Space>
                    <Button onClick={() => router.push("/admin/gallery")}>Hủy</Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        loading={submitting}
                        className="bg-green-500 hover:bg-green-600 border-none"
                    >
                        Lưu thay đổi
                    </Button>
                </Space>
            </div>

            <Spin spinning={loading} size="large">
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
            </Spin>
        </div>
    );
};

const EditGalleryPage = () => (
    <App>
        <EditGalleryContent />
    </App>
);

export default EditGalleryPage;
