"use client";
import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Badge, Button, theme, Dropdown } from 'antd';
import {
    AppstoreOutlined,
    CalendarOutlined,
    ContainerOutlined,
    TeamOutlined,
    ShopOutlined,
    BarChartOutlined,
    SettingOutlined,
    LogoutOutlined,
    SearchOutlined,
    BellOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '/admin/dashboard',
            icon: <AppstoreOutlined />,
            label: <Link href="/admin/dashboard">Tổng quan</Link>,
        },
        {
            key: '/admin/bookings',
            icon: <CalendarOutlined />,
            label: <Link href="/admin/bookings">Đặt bàn</Link>,
        },
        {
            key: '/admin/menu',
            icon: <ContainerOutlined />,
            label: <Link href="/admin/menu">Thực đơn</Link>,
        },
        {
            key: '/admin/staff',
            icon: <TeamOutlined />,
            label: <Link href="/admin/staff">Nhân viên</Link>,
        },
        {
            key: '/admin/inventory',
            icon: <ShopOutlined />,
            label: <Link href="/admin/inventory">Kho hàng</Link>,
        },
        {
            key: '/admin/reports',
            icon: <BarChartOutlined />,
            label: <Link href="/admin/reports">Báo cáo</Link>,
        },
    ];

    const bottomMenuItems = [
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: <Link href="/admin/settings">Cài đặt</Link>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined className="text-red-500" />,
            label: <span className="text-red-500">Đăng xuất</span>,
            danger: true
        }
    ];

    const userMenu = (
        <Menu items={[
            { key: 'profile', label: 'Hồ sơ' },
            { key: 'logout', label: 'Đăng xuất', danger: true }
        ]} />
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} width={260} theme="light" className="border-r border-slate-200">
                <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center shrink-0 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCa6Et103Y7C8Ue_YPlCWyq-8FKFQyq2oUyjeyiKEjNn7O_dJLi-4yoPnZCyRoR5SqvIm1mETKTwNAdmNTcZE1Gq2MazEGORW44AFQ8Snof0m12H9h2PZPSuEwJaP7nzxTP1CzCMCp4zXRKemcM3-eXchWWrCglaOC3KK7ND-KUhIPtjzV6EhPp9J_Org4RbjGnuTQF2SL02Nry3So0be_vU-p7dllyoJJLHrlwrgYa_zbcHzhGGa96xhM-2URZV8qJJCccC3ctuqE")' }}></div>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="text-slate-900 font-bold text-base truncate">Airwave</h1>
                            <span className="text-slate-500 text-xs">Admin Dashboard</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className="border-none px-2"
                    />
                    <div className="border-t border-slate-100 p-2">
                        <Menu mode="inline" items={bottomMenuItems} selectable={false} className="border-none" />
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header style={{ padding: '0 24px', background: colorBgContainer }} className="flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <h2 className="text-xl font-bold text-slate-800 m-0">Tổng quan</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <Input prefix={<SearchOutlined className="text-slate-400" />} placeholder="Tìm kiếm..." className="w-64 hidden md:flex" />
                        <div className="flex items-center gap-4">
                            <Badge count={5} size="small">
                                <Button type="text" shape="circle" icon={<BellOutlined />} />
                            </Badge>
                            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                            <Dropdown overlay={userMenu} trigger={['click']}>
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors">
                                    <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8HtiKmlnxfvhwrpdfsSCWexbPuqk_jEcuEKVUMY0mP1I9Hsw2NTcX-8NkMpw6Tv1LaAUBSE7wu2J-0nchwHvksizarAcuEno9DtUMDoqhnzWmxuKLT06gFrWCi_154tOuHB2jh6Cp0qqRgmj7XAGzPZl2Vl2kPLfVEZ94ti0hnu8ILRSd_BHvwuwZJ2jqns5SbbIG5qKOcojzK08DpNgX7XxV6Wm2uDcdlCs9Iec01Hbfpo2cHq2xpg86qIYsBZvEo3xwjl670YY" />
                                    <div className="hidden sm:block text-right leading-tight">
                                        <div className="text-sm font-bold text-slate-700">Quản lý Viên</div>
                                        <div className="text-xs text-slate-500">Admin</div>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'initial'
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
