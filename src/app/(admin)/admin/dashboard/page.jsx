"use client";
import React from 'react';
import { Row, Col, Card, Statistic, Select, Table, Tag, Progress, Button } from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    TableOutlined,
    DollarOutlined,
    UserOutlined,
    FileTextOutlined,
    DownloadOutlined,
    MoreOutlined
} from '@ant-design/icons';

const { Option } = Select;

export default function AdminDashboard() {

    // Placeholder data for charts/tables
    const topDishes = [
        {
            key: '1',
            name: 'Sunset Cocktail Signature',
            type: 'Đồ uống',
            price: '185.000₫',
            sold: 128,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmjUA-34iQrxLvr_H6LaH2h6aPIw8yfzn8foEVio8lyRRQX_zkrErKgLH6A4Kdvt5LapYB--rL31oQf108biapnP9JhFJwRoe6K1eaxaDZplVHLUjBZ1VzDOacGoIAlJ1HAdFUv9Xbza1XxfL8As4V87I5ZX6AUJKSM4awJgPxwjfIkl-LDY1umqjJ9BU-SfwYQQQT5l8HM-CWMuUwsuhEeYMUAgDh_4TVh3SIp-zeh_8V1hk5A1LICMHp2BKDxKuP-wIlXkZ5Wgc'
        },
        {
            key: '2',
            name: 'Combo Hải Sản Nướng',
            type: 'Đồ ăn',
            price: '450.000₫',
            sold: 84,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY1PJrN7dXte0MnlMfDiXjkFYVLamo3beypfK5AtmWTIWIPvWbL3sEbI8FIVFMbFfo9aDbybjBJbT9CbJbsNBjIPmYLI43qQKpiOoK5sVDkUfiJPoxCL-YL_mJ54v5vWEGeeCa1Z7_mTSu1K01ArWu0J7qcDEApcSu80EjDHoSJh-smESj2jZR0eZemWbBSnXFnXSXvkx6kle6RgL3aiqs2hI2dKQCBStte0zSaX-S43N5O39I5vs9O9fe2_VaGfOfohmGxdnGk6w'
        },
        {
            key: '3',
            name: 'Bia Tươi Phú Quốc',
            type: 'Đồ uống',
            price: '65.000₫',
            sold: 342,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_J_FmJCXmBfKiAolDOf2icpl7zaZxsdMrpjnnRqwyo6rv2_PXtuH674KqgScLtb_a9W-omlZTGM2H8n5YtHBFAUbEqtrSdKyqzKoa42_EtaPctMC_ih7h4TWm4DHJI97c4eqo6rDt2NLbjHSf_Qba_y-vfI5erC-qQ_vqP_9aWEYb2dQ33-tYWhi2gBYz-JmLg7VdkAcX6NI_pieOxtxFbJRWguMIZOoccmq8nQbGaWbwmzTB2vLthCU-ZSKoBQ2Qr-jHMDMzSOQ'
        }
    ];

    const activities = [
        { user: 'Nguyễn Văn A', action: 'đặt bàn mới', detail: '#BK-2093', time: 'Vừa xong', type: 'marketing' },
        { user: 'System', action: 'Đơn hàng đã hoàn thành', detail: '#ORD-4492', time: '15 phút trước', type: 'success' },
        { user: 'Nhân viên kho', action: 'đã cập nhật số lượng nhập bia Tiger', detail: '', time: '32 phút trước', type: 'warning' },
        { user: 'Hệ thống', action: 'tự động sao lưu dữ liệu', detail: '', time: '1 giờ trước', type: 'info' }
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Row */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Đặt bàn mới</span>}
                            value={12}
                            prefix={<TableOutlined className="p-2 bg-green-50 text-green-500 rounded-lg mr-2" />}
                            suffix={
                                <div className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded ml-2 flex items-center">
                                    <ArrowUpOutlined className="mr-1" /> 20%
                                </div>
                            }
                            valueStyle={{ fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Doanh thu ước tính</span>}
                            value={15.2}
                            precision={1}
                            prefix={<DollarOutlined className="p-2 bg-blue-50 text-blue-500 rounded-lg mr-2" />}
                            suffix={
                                <span className="text-lg">tr <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded ml-2 inline-flex items-center"><ArrowUpOutlined className="mr-1" /> 12%</span></span>
                            }
                            valueStyle={{ fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Khách đang truy cập</span>}
                            value={85}
                            prefix={<UserOutlined className="p-2 bg-green-50 text-green-500 rounded-lg mr-2" />}
                            suffix={
                                <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2 flex items-center">
                                    <ArrowDownOutlined className="mr-1" /> 5%
                                </div>
                            }
                            valueStyle={{ fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Đơn chờ xử lý</span>}
                            value={4}
                            prefix={<FileTextOutlined className="p-2 bg-blue-50 text-blue-500 rounded-lg mr-2" />}
                            valueStyle={{ fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts / Main Content */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Doanh thu 7 ngày qua" bordered={false} className="shadow-sm" extra={
                        <Select defaultValue="week" style={{ width: 120 }}>
                            <Option value="week">Tuần này</Option>
                            <Option value="month">Tháng này</Option>
                        </Select>
                    }>
                        <div className="h-64 bg-slate-50 rounded flex items-center justify-center text-slate-400">
                            {/* Placeholder for Chart */}
                            [Chart Visualization Placeholder: Recharts or Chart.js would be used here]
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Lượt khách theo giờ" bordered={false} className="shadow-sm h-full">
                        <div className="h-48 flex items-end justify-between gap-2 px-2">
                            {/* Simple CSS Bar Chart replacement */}
                            {[40, 60, 85, 100, 90, 70].map((h, i) => (
                                <div key={i} className="w-full bg-slate-100 rounded-t-sm hover:bg-green-500 transition-colors relative group" style={{ height: `${h}%` }}>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-slate-400 text-xs mt-2">
                            <span>18h</span><span>19h</span><span>20h</span><span>21h</span><span>22h</span><span>23h</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-sm text-slate-500">Giờ cao điểm dự kiến: <span className="font-bold text-slate-700">21:00 - 22:30</span></p>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Detailed Revenue Report Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">Báo cáo doanh thu chi tiết</h3>
                    <p className="text-slate-500 text-sm">Phân tích hiệu suất kinh doanh theo thời gian thực</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="10" style={{ width: 150 }}>
                        <Option value="10">Tháng 10/2023</Option>
                        <Option value="9">Tháng 9/2023</Option>
                    </Select>
                    <Button type="primary" icon={<DownloadOutlined />} className="bg-green-500 hover:bg-green-600">Xuất dữ liệu</Button>
                </div>
            </div>

            {/* Revenue Metrics Breakdown */}
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="bg-slate-50">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500">Doanh thu hôm nay</span>
                            <span className="text-green-600 bg-green-100 px-1 rounded text-xs">+8.5%</span>
                        </div>
                        <div className="text-2xl font-bold mb-2">18.500.000₫</div>
                        <Progress percent={65} showInfo={false} strokeColor="#22c55e" size="small" />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="bg-slate-50">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500">Tuần này</span>
                            <span className="text-green-600 bg-green-100 px-1 rounded text-xs">+12.4%</span>
                        </div>
                        <div className="text-2xl font-bold mb-2">142.800.000₫</div>
                        <Progress percent={78} showInfo={false} strokeColor="#3b82f6" size="small" />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false} className="bg-slate-50">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-500">Tháng này</span>
                            <span className="text-green-600 bg-green-100 px-1 rounded text-xs">+5.2%</span>
                        </div>
                        <div className="text-2xl font-bold mb-2">580.450.000₫</div>
                        <Progress percent={45} showInfo={false} strokeColor="#6366f1" size="small" />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Món bán chạy nhất" extra={<a href="#">Xem tất cả</a>} bordered={false} className="shadow-sm">
                        <div className="flex flex-col gap-4">
                            {topDishes.map(dish => (
                                <div key={dish.key} className="flex items-center gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${dish.image}')` }}></div>
                                    <div className="flex-1">
                                        <div className="font-medium">{dish.name}</div>
                                        <div className="text-slate-500 text-sm">{dish.type} • {dish.price}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">{dish.sold}</div>
                                        <div className="text-xs text-slate-400">đã bán</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Hoạt động gần đây" bordered={false} className="shadow-sm">
                        <div className="relative pl-4 border-l border-slate-200 ml-2 space-y-6">
                            {activities.map((act, idx) => (
                                <div key={idx} className="relative">
                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${idx === 0 ? 'bg-green-500 shadow-lg' : 'bg-slate-300'}`}></div>
                                    <div className="text-xs text-slate-400 mb-1">{act.time}</div>
                                    <div className="text-sm text-slate-800">
                                        <span className="font-bold">{act.user}</span> {act.action} <span className="font-bold text-green-600">{act.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button block className="mt-6">Xem tất cả hoạt động</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
