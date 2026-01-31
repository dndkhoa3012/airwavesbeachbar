"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Select, Tabs, message, Row, Col, Card, Space, InputNumber } from "antd";
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";

const { TextArea } = Input;

// Separate component for the form to avoid creating form instance during loading
const MenuEditForm = ({
    initialData,
    categories,
    onSave,
    submitting,
    router
}: {
    initialData: any;
    categories: any[];
    onSave: (values: any) => void;
    submitting: boolean;
    router: any;
}) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        // Set form values when initialData is available
        form.setFieldsValue({
            ...initialData,
        });
        // Parse images from JSON string or single URL
        const images = typeof initialData.image === 'string' && initialData.image
            ? (initialData.image.startsWith('[') ? JSON.parse(initialData.image) : [initialData.image])
            : [];
        setImageUrls(images);
    }, [initialData, form]);

    return (
        <>
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
                        Lưu thay đổi
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
                                        onFinish={(values) => onSave({ ...values, imageUrls })}
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
                                                                <Input disabled />
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
                                                <Card
                                                    title="Hình ảnh"
                                                    variant="borderless"
                                                    className="shadow-none border border-slate-200 rounded-md h-full"
                                                    extra={
                                                        imageUrls.length > 0 && (
                                                            <Button
                                                                danger
                                                                size="small"
                                                                type="text"
                                                                onClick={() => setImageUrls([])}
                                                            >
                                                                Xoá tất cả
                                                            </Button>
                                                        )
                                                    }
                                                >
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
        </>
    );
};

const EditMenuPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [menuData, setMenuData] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetchMenuData();
            fetchCategories();
        }
    }, [id]);

    const fetchMenuData = async () => {
        try {
            const res = await fetch(`/api/v1/menus/${id}`);
            if (res.ok) {
                const data = await res.json();
                setMenuData(data);
            } else {
                messageApi.error("Không thể tải thông tin món ăn");
            }
        } catch (error) {
            console.error(error);
            messageApi.error("Lỗi kết nối");
        } finally {
            setLoading(false);
        }
    };

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

    const handleSave = async (data: any) => {
        setSubmitting(true);
        try {
            const submitData = {
                name: data.name,
                categoryId: data.categoryId,
                price: `${data.price}`, // Ensure string format for backend
                image: JSON.stringify(data.imageUrls), // Store as JSON array string
                desc: data.description || data.desc,
            };

            const res = await fetch(`/api/v1/menus/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                messageApi.success("Cập nhật món ăn thành công");
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

    if (loading) {
        return <div className="p-6">Đang tải...</div>;
    }

    if (!menuData) {
        return <div className="p-6">Không tìm thấy dữ liệu</div>;
    }

    return (
        <div className="p-6">
            {contextHolder}
            <MenuEditForm
                initialData={menuData}
                categories={categories}
                onSave={handleSave}
                submitting={submitting}
                router={router}
            />
        </div>
    );
};

export default EditMenuPage;
