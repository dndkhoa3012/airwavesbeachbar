"use client";
import React from "react";
import { Tabs } from "antd";

const drinks = [
    {
        category: "Signature Cocktails",
        items: [
            {
                name: "Phu Quoc Sunset",
                price: "180k",
                desc: "Rượu sim Phú Quốc, nước cam tươi, grenadine, hương thảo.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe6HTCi18bKjXdXFI849Cb6jf6yIfEbG6BgnqzUZYeyjz9CQV1fpBgsNFv1_O4cDIIXK-WzYdDPLy3w7c2kBTDtqQZOPUi0Y0uVVCQa8p44Xg-HmtUGhOkp2faSX1XtdpbXFWmhfDDLOT37MJO8odISvlM-uvCVBXOr5R2v9oZ10OQWofD_3OhJoXcgxe8vBJIKr9vHxFsZvoKkvf4yu13Nz7uRZjqjmAl2xEyGSMjwU8jB6OskOP8DuIZfOTvGWFcvWTto5VSkU4"
            },
            {
                name: "Ocean Blue",
                price: "160k",
                desc: "Rum trắng, blue curacao, nước dứa, nước cốt dừa.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHuT4RZQjHYMcgISsjUPq7nNbx5XNB_UaCjtu4wLCVBX7hXSuo6q4-BcUnJZPWFBh3YdF7u01Lz38a1ENRuYCfSUWU2DX_upMC5jFIS8fnQnY1hLLjG8iaHa0NO5xzAGuBbCErKNmCKnxgwjYrXIOqWu4aNehwFIqCVdOseBy1O5jRFhs5PyvGzP_naLvtED0kxQk36iNupPmrxpN_H8_4LklF72VDOtK1GKRqn2Xj4ds9wSgRYv79i8Mqflw_FipDg9-3j8uwO0E"
            },
            {
                name: "Tropical Mango",
                price: "150k",
                desc: "Xoài tươi chín mọng, vodka, chanh, lá bạc hà.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVmoRW8VSy2yWfsMuUEexQjWbEBwyf3QzifQv7_zV8tm7nu_g54ov9EoUcHq2noQhLZnOicaqqYhuverPOpT5Xm1EVFq52Ad7mU4mSxwUr0CS1J-sz0OmeX8gg1XQk-qyW-egkL4cRXtnoBIwTiVwOaVojNRmBSX98nNs3gu50wVKyzq0RR6waFWb4cDyLq83Rx8KuTjC-meFDtxF62OggBF-rMa7bC-HZ9e-gCu9exL5ImKUS8_kvs7SzMaC5Ih-84SQzxvoNhaY"
            },
            {
                name: "Spicy Ginger",
                price: "170k",
                desc: "Gừng tươi, mật ong rừng, whisky 12 năm, chanh vàng.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC86NcfzTv4TxAL-CDgflMzBhjxVTpfo_33hF-cJMdxMTqOgtSxqg4fej3Cu8NyxZvnxUf1eQC2xSUIxKeusw_TAm9I7YFCChQIzEwqPIF027a8kLjn1o3gslWtFlDQtoNDNhB9CiMakJAYo98VRyJHHKTwlumMyJ2AqpaWcYAxairrQ1SKiVPDx56z_C3-NQ4PSSE1NURuM_rEhoq20ynwscaTrepuLgePpTALItlVMZmTCj6w_thR9F8iJRbrtRcjLbnnOKQuIBQ"
            },
            {
                name: "Phu Quoc Sunset",
                price: "180k",
                desc: "Rượu sim Phú Quốc, nước cam tươi, grenadine, hương thảo.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe6HTCi18bKjXdXFI849Cb6jf6yIfEbG6BgnqzUZYeyjz9CQV1fpBgsNFv1_O4cDIIXK-WzYdDPLy3w7c2kBTDtqQZOPUi0Y0uVVCQa8p44Xg-HmtUGhOkp2faSX1XtdpbXFWmhfDDLOT37MJO8odISvlM-uvCVBXOr5R2v9oZ10OQWofD_3OhJoXcgxe8vBJIKr9vHxFsZvoKkvf4yu13Nz7uRZjqjmAl2xEyGSMjwU8jB6OskOP8DuIZfOTvGWFcvWTto5VSkU4"
            },
            {
                name: "Ocean Blue",
                price: "160k",
                desc: "Rum trắng, blue curacao, nước dứa, nước cốt dừa.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHuT4RZQjHYMcgISsjUPq7nNbx5XNB_UaCjtu4wLCVBX7hXSuo6q4-BcUnJZPWFBh3YdF7u01Lz38a1ENRuYCfSUWU2DX_upMC5jFIS8fnQnY1hLLjG8iaHa0NO5xzAGuBbCErKNmCKnxgwjYrXIOqWu4aNehwFIqCVdOseBy1O5jRFhs5PyvGzP_naLvtED0kxQk36iNupPmrxpN_H8_4LklF72VDOtK1GKRqn2Xj4ds9wSgRYv79i8Mqflw_FipDg9-3j8uwO0E"
            },
            {
                name: "Tropical Mango",
                price: "150k",
                desc: "Xoài tươi chín mọng, vodka, chanh, lá bạc hà.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVmoRW8VSy2yWfsMuUEexQjWbEBwyf3QzifQv7_zV8tm7nu_g54ov9EoUcHq2noQhLZnOicaqqYhuverPOpT5Xm1EVFq52Ad7mU4mSxwUr0CS1J-sz0OmeX8gg1XQk-qyW-egkL4cRXtnoBIwTiVwOaVojNRmBSX98nNs3gu50wVKyzq0RR6waFWb4cDyLq83Rx8KuTjC-meFDtxF62OggBF-rMa7bC-HZ9e-gCu9exL5ImKUS8_kvs7SzMaC5Ih-84SQzxvoNhaY"
            },
            {
                name: "Spicy Ginger",
                price: "170k",
                desc: "Gừng tươi, mật ong rừng, whisky 12 năm, chanh vàng.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC86NcfzTv4TxAL-CDgflMzBhjxVTpfo_33hF-cJMdxMTqOgtSxqg4fej3Cu8NyxZvnxUf1eQC2xSUIxKeusw_TAm9I7YFCChQIzEwqPIF027a8kLjn1o3gslWtFlDQtoNDNhB9CiMakJAYo98VRyJHHKTwlumMyJ2AqpaWcYAxairrQ1SKiVPDx56z_C3-NQ4PSSE1NURuM_rEhoq20ynwscaTrepuLgePpTALItlVMZmTCj6w_thR9F8iJRbrtRcjLbnnOKQuIBQ"
            }
        ]
    }
];

const foods = [
    {
        name: "Mực Nướng Muối Ớt",
        price: "220k",
        desc: "Mực ống tươi Phú Quốc nướng than hoa với sốt muối ớt xanh.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4GJYpjGfsj6dWleFJtXbCQoIrv4bZ4igTeC1IHDLtnIVQnNX5al-Th4m41B1vORo-1Hb_dFsP-b30p2Xb6CMg7biWFVCqU9bQD7vIIwRlVB5hxdhaRGa13ZcN3Qrh_ZTAhrEzqOZfjPzalbsshqoPixskZuuVkGTGJwnUfOlrlZ8HCsdGPBSWxn_3x9WBUQRPlWJT4o7eAq6WYZaDbdhRCJrpaMRkR6D-KsRIr_tu3vkvFaA_lPPC--mYkZvjZcC7kj92R4nQ5Yg"
    },
    {
        name: "Gỏi Cá Trích",
        price: "180k",
        desc: "Đặc sản Phú Quốc với dừa nạo, hành tây, lạc rang.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy0JELR7hZOepsyammLWo-GYTnjCyBUd6Ix7j-RkYl6a1HwaeXhMMPbe9w2zs01s5DImaBzj-867DdwmTMGMksV8NtZCHzJAGa0hJn84wKAvnBpzoD-JSPDfQsL6o0sT9bkePofktbjvdRa7QJewz9pfS01pDtFfxMhWoO4qhn28OECdvsetk776fkqpW2s6If8Nm4fsBFkIBddJDKMaSMcrg30tzMAsZwS58x4ts3pAz1_fqJuV2AlOSVz-jlEJEwWCO_CUtkPmg"
    },
    {
        name: "Beach Burger",
        price: "250k",
        desc: "Bò Wagyu, phô mai cheddar, khoai tây chiên giòn.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFgjU_x4bD3z3ljrIZk1xusZYvEZGOWZLqf6bvw_a7WDdlSKMlHWYOSn3HjezltP7APHypj4RoY0CZmp-4lAhKUVz9VDo2EHrJ0CeB1zcP8uMgAd8JJqSpj1oaOzIEZ9lQ6YWsC306H6t4Fd_dJqNUzmEN3sIc9_o8rSTMeoN7D_5q7xHcBMR5M5Kg8uaBSfr2o-Tg0RyYOumEp-3YCvYVFgJtSrFvOQWl2Jfq4SF3jqzDV70o8OLchnTh5MUZwDJU9UEyG9kQNCU"
    },
    {
        name: "Tôm Nướng Mọi",
        price: "300k",
        desc: "Tôm sú biển tươi, nướng than giữ nguyên vị ngọt.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHwDgQnkP7v_Zi2OIn7eqqPjrZnpIUeY_jeI3XUGDypbP5c98YYoDtE8KpcD1McA3Wkomiq8Uu9_h2EzTeH3EMWA8G2ZH7u-V1loW0IENjzp60J_M_NRvrXMGtDwao5eNqfj-xHKVKND5ZmhVNVQpM5AytqfH5z6wFjctQ3p0A6j8AGsLfXvdMPgp0ef5C5oMsm47xEfZY_JZOKCKu_ZDsZETN3Rl0JD6mf3rBd4klQ1L8NEniy3XFBtAm1d5KOmXRyq1fmBPAAV8"
    }
];

const beersAndWines = [
    {
        name: "Bia Phú Quốc (Local)",
        price: "60k",
        desc: "Bia thủ công địa phương, hương vị đậm đà.",
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Sauvignon Blanc",
        price: "240k/ly",
        desc: "Vang trắng New Zealand, hương chanh dây và bưởi.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Craft IPA",
        price: "120k",
        desc: "Hương hoa bia nồng nàn, hậu vị ngọt nhẹ.",
        image: "https://images.unsplash.com/photo-1588665510694-573516d252e3?q=80&w=2187&auto=format&fit=crop"
    }
];

const appetizers = [
    {
        name: "Chả Giò Hải Sản",
        price: "120k",
        desc: "Tôm, mực, cua tươi cuốn bánh đa nem giòn rụm.",
        image: "https://images.unsplash.com/photo-1541544537928-16ef2668a7b3?q=80&w=2576&auto=format&fit=crop"
    },
    {
        name: "Salad Xoài Tôm Khô",
        price: "110k",
        desc: "Vị chua ngọt thanh mát, kích thích vị giác.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2484&auto=format&fit=crop"
    },
    {
        name: "Mực Chiên Giòn",
        price: "150k",
        desc: "Mực vòng tẩm bột chiên xù, chấm sốt tartar.",
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=2680&auto=format&fit=crop"
    }
];

const desserts = [
    {
        name: "Kem Dừa Phú Quốc",
        price: "80k",
        desc: "Làm từ dừa xiêm tươi, béo ngậy và mát lạnh.",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Trái Cây Nhiệt Đới",
        price: "120k",
        desc: "Dĩa trái cây theo mùa tươi ngon và ngọt lịm.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=2487&auto=format&fit=crop"
    },
    {
        name: "Bánh Plan Caramel",
        price: "70k",
        desc: "Mềm mịn, thơm trứng sữa, sốt caramel đắng nhẹ.",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=2678&auto=format&fit=crop"
    }
];

const MenuSection = ({ title, items, gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }) => (
    <div className="mb-12 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-4 px-4 pb-6 pt-2">
            <h2 className="text-slate-900 tracking-tight text-[28px] md:text-[32px] font-bold leading-tight">{title}</h2>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
        </div>

        {/* Responsive Container: Horizontal Scroll (Mobile/Tablet) -> Grid (Desktop) */}
        <div className={`
            flex overflow-x-auto snap-x snap-mandatory gap-4 p-4 no-scrollbar -mx-4 px-8 pb-8
            lg:grid lg:overflow-visible lg:mx-0 lg:px-4 lg:pb-4 ${gridCols}
        `}>
            {items.map((item, idx) => (
                <div key={idx} className="
                    group flex flex-col gap-4 p-4 rounded-2xl bg-white border border-slate-100 
                    min-w-[85vw] sm:min-w-[300px] snap-center
                    lg:min-w-0 lg:snap-align-none
                    hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300
                ">
                    <div className="w-full relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${item.image}")` }}></div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-slate-900 text-lg font-bold leading-normal group-hover:text-primary transition-colors">{item.name}</p>
                            {/* Price removed as requested */}
                        </div>
                        <p className="text-slate-500 text-sm font-normal leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function MenuPage() {

    // Tab Items Configuration
    const items = [
        {
            key: 'all',
            label: 'Tất cả',
            children: (
                <div className="mt-6">
                    <MenuSection title="Signature Cocktails" items={drinks[0].items} gridCols="lg:grid-cols-4" />
                    <MenuSection title="Bia & Rượu" items={beersAndWines} />
                    <MenuSection title="Món Khai Vị" items={appetizers} />
                    <MenuSection title="Hải Sản & Món Chính" items={foods} />
                    <MenuSection title="Tráng Miệng" items={desserts} />
                </div>
            ),
        },
        {
            key: 'cocktails',
            label: 'Signature Cocktails',
            children: <div className="mt-6"><MenuSection title="Signature Cocktails" items={drinks[0].items} gridCols="lg:grid-cols-4" /></div>,
        },
        {
            key: 'beer-wine',
            label: 'Bia & Rượu',
            children: <div className="mt-6"><MenuSection title="Bia & Rượu" items={beersAndWines} /></div>,
        },
        {
            key: 'appetizers',
            label: 'Món Khai Vị',
            children: <div className="mt-6"><MenuSection title="Món Khai Vị" items={appetizers} /></div>,
        },
        {
            key: 'main-course',
            label: 'Món Chính',
            children: <div className="mt-6"><MenuSection title="Hải Sản & Món Chính" items={foods} /></div>,
        },
        {
            key: 'desserts',
            label: 'Tráng Miệng',
            children: <div className="mt-6"><MenuSection title="Tráng Miệng" items={desserts} /></div>,
        },
    ];

    return (
        <div className="w-full bg-slate-50 min-h-screen">
            {/* Dramatic Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsYNq9kWbzbQY-n4Xa7HcsXMN-Uk1gRTMbQBSKBfSNF7jdwJhHsb2n3rR4jB6qhczbil3GTz_XP2klgJIlI-dwfu2G0gCbe2astDijjwunEK4HlaW_ezI7ZGkiMU4lvpE_j_TLPeeo_I571cSf-FevYgsgkX_itKT3V7_7MXniOflD3D0ZmWT5Sz9orfsQTdKTbBFKh7Qv7vMCKyWYTjdOnZh95V7XsYJ3j1QqWFl5GWlLtwuBucZV-hbzey1bnZrPN8dpuh-0SQo")' }}
                ></div>
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Thực Đơn</h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">Khám phá hương vị biển cả và những ly cocktail tuyệt hảo.</p>
                </div>
            </section>

            <div className="layout-container flex h-full grow flex-col bg-slate-50">
                <div className="px-4 md:px-10 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-7xl flex-1">

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
