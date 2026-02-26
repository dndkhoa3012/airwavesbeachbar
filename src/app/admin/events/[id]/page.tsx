"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Select, Tabs, App, Row, Col, Card, Upload, Space, DatePicker, TimePicker, InputNumber, message } from "antd";
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined, PlusOutlined, ClockCircleOutlined, EnvironmentOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import TimelineBuilder from "@/components/admin/timeline-builder";
import { ImageUploadGrid } from "@/components/admin/ImageUploadGrid";
import dynamic from 'next/dynamic';
import dayjs from "dayjs";

// Load CKEditor dynamically to avoid SSR issues
const CKEditorComponent = dynamic(
    () => import('@/components/admin/CKEditorComponent'),
    { ssr: false, loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg" /> }
);

import { Tooltip } from "antd";

const { TextArea } = Input;

const EditEventPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    // const { message } = App.useApp();
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [categories, setCategories] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');
    const [showContentEditor, setShowContentEditor] = useState(false);

    useEffect(() => {
        if (id) {
            fetchEventData();
            fetchCategories();
        }
    }, [id]);

    const fetchEventData = async () => {
        try {
            const res = await fetch(`/api/v1/events/${id}`);
            if (res.ok) {
                const data = await res.json();

                // Format data for form
                const formData = {
                    ...data,
                    date: data.date ? dayjs(data.date) : null,
                    startTime: data.startTime ? dayjs(data.startTime, 'HH:mm') : null,
                    endTime: data.endTime ? dayjs(data.endTime, 'HH:mm') : null,
                };

                form.setFieldsValue(formData);
                setContent(data.content || '');
                try {
                    const parsedImages = data.image ? (data.image.startsWith('[') ? JSON.parse(data.image) : [data.image]) : [];
                    setImageUrl(parsedImages);
                } catch (e) {
                    console.error("Error parsing images:", e);
                    setImageUrl([]);
                }
            } else {
                messageApi.error("Không thể tải thông tin sự kiện");
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
            const res = await fetch('/api/v1/event-categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    };

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };

    const handleSave = async (values: any) => {
        // Validate content if editor was opened
        if (showContentEditor && (!content || content.trim() === '' || content === '<p></p>')) {
            messageApi.error('Vui lòng nhập nội dung sự kiện hoặc xoá sự kiện!');
            setActiveTab('3');
            return;
        }

        setSubmitting(true);
        try {
            // Format values for API
            // Prioritize 'values' (validated form data) over 'getFieldsValue(true)' (store data)
            const allValues = { ...form.getFieldsValue(true), ...values };

            const submitData = {
                title: allValues.title,
                categoryId: allValues.categoryId,
                price: allValues.price,
                location: allValues.location,
                image: JSON.stringify(imageUrl),
                description: allValues.description,
                date: allValues.date ? allValues.date.format('YYYY-MM-DD') : null,
                startTime: allValues.startTime ? allValues.startTime.format('HH:mm') : null,
                endTime: allValues.endTime ? allValues.endTime.format('HH:mm') : null,
                itinerary: allValues.itinerary,
                timeline: allValues.timeline,
                content: content,
            };

            const res = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                messageApi.success("Cập nhật sự kiện thành công!");
                // router.push("/admin/events"); // Keep user on page as requested

                // Optional: Re-fetch or minimal update if needed, but form state is likely fresh enough
            } else {
                const errorText = await res.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    errorData = { error: errorText || "Unknown error" };
                }
                console.error("Server error raw:", errorText);
                messageApi.error(`Lỗi: ${errorData.error || errorData.details || "Có lỗi xảy ra khi lưu"}`);
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
                    <Button onClick={() => router.push("/admin/events")}>Hủy</Button>
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
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    onFinishFailed={({ errorFields }) => {
                        let hasGeneralInfoError = false;

                        // Check if error is in General Info tab fields
                        errorFields.forEach(field => {
                            const fieldName = String(field.name[0]);
                            if (['title', 'categoryId', 'date', 'startTime', 'endTime', 'image', 'location', 'price', 'description'].includes(fieldName)) {
                                hasGeneralInfoError = true;
                            }
                        });

                        if (hasGeneralInfoError) {
                            setActiveTab("1");
                        } else {
                            setActiveTab("2");
                        }
                    }}
                    disabled={loading}
                >
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        type="card"
                        tabBarStyle={{ margin: 0, padding: '10px 10px 0 10px', background: '#f5f5f5' }}
                        items={[
                            {
                                key: '1',
                                label: 'Thông tin chung',
                                children: (
                                    <div className="p-6">

                                        <Row gutter={24}>
                                            <Col span={16}>
                                                <Card title="Thông tin sự kiện" variant="borderless" className="shadow-none p-0 border border-slate-200 rounded-md">
                                                    <Row gutter={16}>
                                                        <Col span={12}>
                                                            <Form.Item name="id" label="Mã sự kiện">
                                                                <Input disabled />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="title"
                                                                label="Tên sự kiện"
                                                                rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
                                                            >
                                                                <Input placeholder="Ví dụ: Full Moon Party" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item name="categoryId" label="Danh mục">
                                                                <Select placeholder="Chọn danh mục">
                                                                    {categories.map(cat => (
                                                                        <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="location"
                                                                label="Địa điểm"
                                                                rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}>
                                                                <Input placeholder="Ví dụ: Airwaves Beach Bar" />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={24}>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <Form.Item name="date" label="Ngày diễn ra" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                                                                    <DatePicker className="w-full" format="DD/MM/YYYY" disabledDate={disabledDate} />
                                                                </Form.Item>
                                                                <Form.Item name="startTime" label="Giờ bắt đầu" rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}>
                                                                    <TimePicker className="w-full" format="HH:mm" />
                                                                </Form.Item>
                                                                <Form.Item name="endTime" label="Giờ kết thúc" rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}>
                                                                    <TimePicker className="w-full" format="HH:mm" />
                                                                </Form.Item>
                                                            </div>
                                                        </Col>

                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="price"
                                                                label={
                                                                    <span>
                                                                        Giá vé{" "}
                                                                        <Tooltip title='Nhập giá tiền (VND). Nếu giá = 0 sẽ hiển thị "Miễn phí" trên trang công khai.'>
                                                                            <InfoCircleOutlined className="text-gray-400 cursor-help" />
                                                                        </Tooltip>
                                                                    </span>
                                                                }
                                                                rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
                                                            >
                                                                <InputNumber
                                                                    style={{ width: '100%', maxWidth: 200 }}
                                                                    min={0}
                                                                    placeholder="Ví dụ: 200000"
                                                                    suffix="VND"
                                                                    controls={false}
                                                                />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={24}>
                                                            <Form.Item name="description" label="Ghi chú / Mô tả">
                                                                <TextArea rows={4} placeholder="Nhập mô tả sự kiện..." />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>

                                            <Col span={8}>
                                                <Card
                                                    variant="borderless"
                                                    className="shadow-none border border-slate-200 rounded-md h-full"
                                                >
                                                    <ImageUploadGrid
                                                        value={imageUrl}
                                                        onChange={setImageUrl}
                                                    />
                                                </Card>
                                            </Col>
                                        </Row>

                                    </div>
                                ),
                            },
                            {
                                key: '2',
                                label: 'Lịch trình',
                                children: (
                                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm">
                                        <TimelineBuilder />
                                    </div>
                                )
                            },
                            {
                                key: '3',
                                label: 'Giới thiệu sự kiện',
                                children: (
                                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm">
                                        {!showContentEditor && !content ? (
                                            <div className="text-center p-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                                <p className="text-slate-500 mb-4">Chưa có bài giới thiệu sự kiện.</p>
                                                <Button
                                                    type="primary"
                                                    onClick={() => setShowContentEditor(true)}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Tạo bài viết
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nội dung bài viết</div>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        onClick={() => {
                                                            setContent('');
                                                            setShowContentEditor(false);
                                                        }}
                                                        className="hover:bg-red-50"
                                                    >
                                                        Xoá
                                                    </Button>
                                                </div>
                                                <CKEditorComponent
                                                    content={content}
                                                    onChange={setContent}
                                                    placeholder="Nhập nội dung giới thiệu sự kiện..."
                                                />
                                            </>
                                        )}
                                    </div>
                                )
                            }
                        ]}
                    />
                </Form>
            </div>
        </div>
    );
};

export default EditEventPage;
