import React from "react";
import { Tabs } from "antd";
import { prisma } from "@/lib/prisma";
import { MenuSection } from "./components/menu-section";

// Server Component (default in App Router)
export default async function MenuPage() {
    // Fetch categories with menus
    const categories = await prisma.menuCategory.findMany({
        include: {
            menus: true
        },
        orderBy: {
            createdAt: 'asc' // Or any specific order
        }
    });


    // helper formatPrice moved to component or duplicated, removing from here if unused
    // But wait, the page doesn't use formatPrice anymore if MenuSection handles it.


    // Create "All" tab content
    const allTabContent = (
        <div className="mt-6">
            {categories.map(cat => (
                <MenuSection
                    key={cat.id}
                    title={cat.name}
                    items={cat.menus}
                    // Optional: Custom grid cols based on category if needed
                    gridCols="lg:grid-cols-3"
                />
            ))}
        </div>
    );

    // Create detailed tabs
    const categoryTabs = categories.map(cat => ({
        key: cat.id,
        label: cat.name,
        children: <div className="mt-6"><MenuSection title={cat.name} items={cat.menus} /></div>
    }));

    // Combine for Ant Design Tabs
    const items = [
        {
            key: 'all',
            label: 'Tất cả',
            children: allTabContent
        },
        ...categoryTabs
    ];

    return (
        <div className="w-full bg-slate-50 min-h-screen">
            {/* Dramatic Hero Section */}
            {/* Hero Section */}
            <div className="px-4 pt-6 md:px-10 lg:px-40 bg-slate-50 flex justify-center">
                <div className="relative w-full max-w-[1200px] h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Airwaves Menu"
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsYNq9kWbzbQY-n4Xa7HcsXMN-Uk1gRTMbQBSKBfSNF7jdwJhHsb2n3rR4jB6qhczbil3GTz_XP2klgJIlI-dwfu2G0gCbe2astDijjwunEK4HlaW_ezI7ZGkiMU4lvpE_j_TLPeeo_I571cSf-FevYgsgkX_itKT3V7_7MXniOflD3D0ZmWT5Sz9orfsQTdKTbBFKh7Qv7vMCKyWYTjdOnZh95V7XsYJ3j1QqWFl5GWlLtwuBucZV-hbzey1bnZrPN8dpuh-0SQo"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>
            </div>

            <div className="layout-container flex h-full grow flex-col bg-slate-50">
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-12">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                        {/* Title Section */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Thực Đơn</h1>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Khám phá hương vị biển cả và những ly cocktail tuyệt hảo.</p>
                        </div>

                        <div className="sticky top-[72px] z-40 bg-slate-50/95 backdrop-blur-sm pt-4 pb-2">
                            <Tabs
                                defaultActiveKey="all"
                                items={items}
                                size="large"
                                centered
                                tabBarStyle={{
                                    marginBottom: 0,
                                    borderBottom: '1px solid #e2e8f0'
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
