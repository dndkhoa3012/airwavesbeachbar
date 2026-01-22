"use client";
import React from 'react';
import { GravityStars } from '@/components/GravityStars';
import { Input, Button, Form } from 'antd';
import { LockOutlined, MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function AdminLoginPage() {
    const onFinish = (values) => {
        console.log('Success:', values);
        // Here you would implement login logic and redirect
        // window.location.href = "/admin/dashboard";
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <GravityStars />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[480px] px-6">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-slate-100/50">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        <img src="/logo.jpg" alt="Airwave" className="h-16 mb-6" />
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">Hệ thống Quản trị</h1>
                        <p className="text-slate-500 text-sm">Vui lòng đăng nhập để tiếp tục điều hành</p>
                    </div>

                    {/* Form */}
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-slate-400" />}
                                placeholder="admin@airwave.vn"
                                className="rounded-xl bg-slate-50 border-slate-200 hover:border-green-500 focus:border-green-500"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mật khẩu</span>}
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-slate-400" />}
                                placeholder="••••••••"
                                className="rounded-xl bg-slate-50 border-slate-200 hover:border-green-500 focus:border-green-500"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 font-bold text-base flex items-center justify-center gap-2"
                            >
                                Đăng nhập <ArrowRightOutlined />
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <Link href="#" className="text-slate-500 hover:text-green-600 text-sm transition-colors">
                            Quên mật khẩu?
                        </Link>

                        <div className="mt-12 pt-6 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-300 tracking-[2px] uppercase">
                                Airwave OS v2.4.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
