"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, message, InputNumber, Switch, Space } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { createBanner } from "../banner.service";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";

const { TextArea } = Input;

const PAGE_TYPE_OPTIONS = [
    { label: "Trang chủ", value: "HOME" },
    { label: "Thực đơn", value: "MENU" },
    { label: "Sự kiện", value: "EVENTS" },
];

const CreateBannerPage = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleSave = async (values: any) => {
        try {
            setSubmitting(true);

            if (imageUrls.length === 0) {
                messageApi.error("Vui lòng chọn hình ảnh");
                setSubmitting(false);
                return;
            }

            const bannerData = {
                ...values,
                imageUrls: imageUrls, // Send as array
            };

            await createBanner(bannerData);
            messageApi.success("Đã thêm banner mới");
            router.push("/admin/home/banner");
        } catch (error: any) {
            messageApi.error(error.response?.data?.error || "Có lỗi xảy ra");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            {contextHolder}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold">Thêm banner mới</h1>
                </div>
                <Space>
                    <Button onClick={() => router.push("/admin/home/banner")}>Hủy</Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        loading={submitting}
                        className="bg-green-500 hover:bg-green-600"
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
                    initialValues={{ isActive: true, order: 0 }}
                >
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-4">
                            <Form.Item
                                name="pageType"
                                label="Trang hiển thị"
                                rules={[{ required: true, message: 'Vui lòng chọn trang!' }]}
                            >
                                <Select placeholder="Chọn trang" options={PAGE_TYPE_OPTIONS} size="large" />
                            </Form.Item>

                            <Form.Item name="title" label="Tiêu đề (không bắt buộc)">
                                <Input placeholder="Ví dụ: Chào mừng đến với Airwaves" size="large" />
                            </Form.Item>

                            <Form.Item name="subtitle" label="Phụ đề (không bắt buộc)">
                                <TextArea
                                    placeholder="Mô tả ngắn gọn về banner"
                                    rows={4}
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item name="altText" label="Văn bản thay thế (Alt text)">
                                <Input placeholder="Mô tả hình ảnh cho SEO" size="large" />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item name="order" label="Thứ tự hiển thị">
                                    <InputNumber
                                        min={0}
                                        placeholder="0"
                                        className="w-full"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item name="isActive" label="Kích hoạt" valuePropName="checked">
                                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold mb-4">Hình ảnh</h3>

                                <div className="mb-2">
                                    <p className="text-xs text-gray-500">
                                        Kích thước đề xuất: 1920x500px
                                    </p>
                                </div>

                                <ImageUploadGrid
                                    value={imageUrls}
                                    onChange={setImageUrls} // Allow multiple images
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateBannerPage;

