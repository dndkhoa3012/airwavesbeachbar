"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, Tabs, App, Row, Col, Card, Space, DatePicker, TimePicker, message, InputNumber } from "antd";
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined, MinusCircleOutlined, PlusOutlined, ClockCircleOutlined, EnvironmentOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import TimelineBuilder from "@/components/admin/timeline-builder";
import dynamic from 'next/dynamic';
import dayjs from "dayjs";

// Load CKEditor dynamically to avoid SSR issues
const CKEditorComponent = dynamic(
    () => import('@/components/admin/CKEditorComponent'),
    { ssr: false, loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg" /> }
);

import { Tooltip } from "antd";

const { TextArea } = Input;

const CreateEventPage = () => {
    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };

    const router = useRouter();
    // const { message } = App.useApp();
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [categories, setCategories] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [content, setContent] = useState<string>('');
    const [showContentEditor, setShowContentEditor] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

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
            const allValues = { ...form.getFieldsValue(true), ...values };

            const submitData = {
                title: allValues.title,
                categoryId: allValues.categoryId,
                price: allValues.price,
                location: allValues.location,
                image: allValues.image,
                description: allValues.description,
                date: allValues.date ? allValues.date.format('YYYY-MM-DD') : null,
                startTime: allValues.startTime ? allValues.startTime.format('HH:mm') : null,
                endTime: allValues.endTime ? allValues.endTime.format('HH:mm') : null,
                itinerary: allValues.itinerary,
                timeline: allValues.timeline,
                content: content,
            };

            const res = await fetch(`/api/v1/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                messageApi.success("Thêm sự kiện mới thành công");
                router.push("/admin/events");
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
                        Lưu
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
                    initialValues={{
                        price: 0,
                        location: "John's Tours Beach Bar"
                    }}
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
                                                                <Input disabled placeholder="Tự động tạo" />
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
                                                <Card title="Hình ảnh" variant="borderless" className="shadow-none border border-slate-200 rounded-md h-full">
                                                    <Form.Item
                                                        help="Nhập URL hình ảnh hoặc tải lên"
                                                    >
                                                        <Space.Compact style={{ width: '100%' }}>
                                                            <Form.Item
                                                                name="image"
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="https://..."
                                                                    onChange={(e) => setImageUrl(e.target.value)}
                                                                />
                                                            </Form.Item>
                                                            <Button icon={<UploadOutlined />} />
                                                        </Space.Compact>
                                                    </Form.Item>

                                                    <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-2 min-h-[200px] flex items-center justify-center bg-gray-50">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt="Event Preview"
                                                                className="max-w-full max-h-[300px] object-contain rounded-md"
                                                                onError={(e) => (e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23f5f5f5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%23999%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E')}
                                                            />
                                                        ) : (
                                                            <div className="text-gray-400 text-center">
                                                                <UploadOutlined className="text-3xl mb-2" />
                                                                <p>Chưa có hình ảnh</p>
                                                            </div>
                                                        )}
                                                    </div>
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
                                ),
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
                                ),
                            },
                        ]}
                    />
                </Form>
            </div >
        </div >
    );
};

export default CreateEventPage;
