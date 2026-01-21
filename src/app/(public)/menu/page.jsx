import React from "react";

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

export default function MenuPage() {
    return (
        <div className="w-full bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-5">
                <div className="@container">
                    <div className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 relative overflow-hidden group shadow-2xl shadow-slate-200" data-alt="Sunset view over the ocean with a cocktail in the foreground" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsYNq9kWbzbQY-n4Xa7HcsXMN-Uk1gRTMbQBSKBfSNF7jdwJhHsb2n3rR4jB6qhczbil3GTz_XP2klgJIlI-dwfu2G0gCbe2astDijjwunEK4HlaW_ezI7ZGkiMU4lvpE_j_TLPeeo_I571cSf-FevYgsgkX_itKT3V7_7MXniOflD3D0ZmWT5Sz9orfsQTdKTbBFKh7Qv7vMCKyWYTjdOnZh95V7XsYJ3j1QqWFl5GWlLtwuBucZV-hbzey1bnZrPN8dpuh-0SQo")' }}>
                        <div className="absolute inset-0 bg-black/30 z-0"></div>
                        <div className="flex flex-col gap-2 text-center z-10 max-w-2xl">
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
                                Hương vị biển cả
                            </h1>
                            <h2 className="text-white text-sm md:text-lg font-normal leading-normal mt-2 drop-shadow-md">
                                Trải nghiệm ẩm thực và đồ uống tuyệt vời giữa lòng Phú Quốc
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 w-full py-3 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-10 overflow-x-auto no-scrollbar">
                    <div className="flex gap-3 p-1 min-w-max">
                        <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-primary to-green-400 text-white px-6 shadow-md shadow-green-500/20 transition-transform hover:scale-105 border border-transparent">
                            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                            <p className="text-sm font-bold leading-normal">Tất cả</p>
                        </div>
                        {["Signature Cocktails", "Bia & Rượu", "Món Khai Vị", "Món Chính", "Tráng Miệng"].map((item) => (
                            <div key={item} className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-slate-50 px-6 transition-all group shadow-sm">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-[18px]">local_bar</span>
                                <p className="text-slate-600 group-hover:text-primary text-sm font-medium leading-normal">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="layout-container flex h-full grow flex-col bg-white">
                <div className="px-4 md:px-10 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-7xl flex-1">
                        {/* Cocktails Section */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 px-4 pb-6 pt-6">
                                <h2 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight">Signature Cocktails</h2>
                                <div className="h-[1px] flex-1 bg-slate-100"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                                {drinks[0].items.map((drink, idx) => (
                                    <div key={idx} className="group flex flex-col gap-4 p-4 rounded-2xl bg-white hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                                        <div className="w-full relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-50">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${drink.image}")` }}></div>
                                            <button className="absolute bottom-3 right-3 size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-500 hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-slate-900 text-lg font-bold leading-normal group-hover:text-primary transition-colors">{drink.name}</p>
                                                <p className="text-primary font-bold text-lg leading-normal">{drink.price}</p>
                                            </div>
                                            <p className="text-slate-500 text-sm font-normal leading-relaxed line-clamp-2">{drink.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Food Section */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 px-4 pb-6 pt-2">
                                <h2 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight">Hải Sản & Món Chính</h2>
                                <div className="h-[1px] flex-1 bg-slate-100"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                                {foods.map((food, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all group">
                                        <div className="w-28 h-28 shrink-0 bg-center bg-no-repeat bg-cover rounded-xl shadow-md" style={{ backgroundImage: `url("${food.image}")` }}></div>
                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div>
                                                <div className="flex justify-between">
                                                    <p className="text-slate-900 text-base font-bold leading-normal group-hover:text-primary transition-colors">{food.name}</p>
                                                    <p className="text-primary text-base font-bold">{food.price}</p>
                                                </div>
                                                <p className="text-slate-500 text-sm font-normal mt-1 line-clamp-2">{food.desc}</p>
                                            </div>
                                            <button className="self-start text-xs font-bold text-primary bg-slate-50 px-4 py-1.5 rounded-full mt-2 group-hover:bg-primary group-hover:text-white transition-all">
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
