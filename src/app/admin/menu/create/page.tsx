"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, Tabs, message, Row, Col, Card, Space, InputNumber } from "antd";
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";

const { TextArea } = Input;


const CreateMenuPage = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/v1/menu-categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    };

    const handleSave = async (values: any) => {
        setSubmitting(true);
        try {
            const submitData = {
                name: values.name,
                categoryId: values.categoryId,
                price: `${values.price}`,
                image: JSON.stringify(imageUrls), // Store as JSON array string
                desc: values.description || values.desc,
                category: categories.find(c => c.id === values.categoryId)?.name || 'Default', // Legacy support if API needs name
            };

            const res = await fetch(`/api/v1/menus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                messageApi.success("Thêm món mới thành công");
                router.push("/admin/menu");
            } else {
                messageApi.error("Có lỗi xảy ra khi lưu");
            }
        } catch (error) {
            console.error(error);
            messageApi.error("Lỗi kết nối");
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
                </div>
                <Space>
                    <Button onClick={() => router.push("/admin/menu")}>Hủy</Button>
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

            <div className="bg-white rounded-lg shadow-sm border">
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    tabBarStyle={{ margin: 0, padding: '10px 10px 0 10px', background: '#f5f5f5' }}
                    items={[
                        {
                            key: '1',
                            label: 'Thông tin chung',
                            children: (
                                <div className="p-6">
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleSave}
                                        validateTrigger="onSubmit"
                                        initialValues={{
                                            price: "0",
                                        }}
                                    >
                                        <Row gutter={24}>
                                            {/* Column Left: Information */}
                                            <Col span={16}>
                                                <Card title="Thông tin món ăn" variant="borderless" className="shadow-none p-0 border border-slate-200 rounded-md">
                                                    <Row gutter={16}>
                                                        <Col span={12}>
                                                            <Form.Item name="id" label="Mã món">
                                                                <Input disabled placeholder="Tự động tạo" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="name"
                                                                label="Tên món"
                                                                rules={[{ required: true, message: 'Vui lòng nhập tên món!' }]}
                                                            >
                                                                <Input placeholder="Ví dụ: Burger Bò" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="categoryId"
                                                                label="Danh mục"
                                                                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                                            >
                                                                <Select placeholder="Chọn danh mục">
                                                                    {categories.map(cat => (
                                                                        <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="price"
                                                                label="Giá bán"
                                                                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                                            >
                                                                <InputNumber
                                                                    className="w-full"
                                                                    placeholder="50000"
                                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                    parser={(displayValue) => displayValue?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                                                />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={24}>
                                                            <Form.Item name="desc" label="Mô tả">
                                                                <TextArea rows={4} placeholder="Mô tả món ăn..." />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>

                                            {/* Column Right: Images */}
                                            <Col span={8}>
                                                <Card title="Hình ảnh" variant="borderless" className="shadow-none border border-slate-200 rounded-md h-full">
                                                    <ImageUploadGrid
                                                        value={imageUrls}
                                                        onChange={setImageUrls}
                                                    />
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default CreateMenuPage;
