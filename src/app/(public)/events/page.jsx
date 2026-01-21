"use client";
import React from "react";
import Link from "next/link";

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative w-full py-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2c-Nu0EDvE5QrwZs55x-9T4shwjB2uDCkpSPCyfwUSGLnLqB277DA5vi0JpIpQujen2S7vpPxAaU3xnnnndO9mu5Jjc8tMJEj8joTh2RTugtnX2t9Kwu3jiVs2I2plUwDfP2aHahIBJ78znh6uv-8B2ysfHaD1dXLTQc-n9r9dYS8pvp_QfE8P0UdTYadAbrp-HZVIt5LKHRfqnXr6U_uRWxr3BDLHZThBpk8ALfrNrtub81w8AdlfJs0PyN0NrYNdTsKhpplSSU')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                <div className="relative z-10 px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 text-center items-center">
                        <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                            Lịch Trình & Đặt Vé
                        </span>
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.02em] mb-6 drop-shadow-xl">
                            Sự Kiện Tại <span className="text-primary">Airwave</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                            Đừng bỏ lỡ những bữa tiệc âm nhạc sôi động, các đêm diễn nghệ thuật và những khoảnh khắc đáng nhớ bên bờ biển.
                        </p>
                    </div>
                </div>
            </section>

            {/* Events List */}
            <section className="w-full py-16">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Event Card 1 */}
                            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group flex flex-col">
                                <div
                                    className="h-60 bg-cover bg-center relative overflow-hidden"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2c-Nu0EDvE5QrwZs55x-9T4shwjB2uDCkpSPCyfwUSGLnLqB277DA5vi0JpIpQujen2S7vpPxAaU3xnnnndO9mu5Jjc8tMJEj8joTh2RTugtnX2t9Kwu3jiVs2I2plUwDfP2aHahIBJ78znh6uv-8B2ysfHaD1dXLTQc-n9r9dYS8pvp_QfE8P0UdTYadAbrp-HZVIt5LKHRfqnXr6U_uRWxr3BDLHZThBpk8ALfrNrtub81w8AdlfJs0PyN0NrYNdTsKhpplSSU")',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide border border-white opacity-90">
                                        24 Tháng 10
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-primary text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
                                        Vé bán chạy
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <h3 className="text-slate-900 text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            Full Moon Party
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                            <span className="material-symbols-outlined text-lg">schedule</span>
                                            <span>20:00 - 02:00</span>
                                        </div>
                                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                                            Đêm tiệc trăng rằm huyền thoại với các màn trình diễn lửa,
                                            DJ quốc tế và đồ uống miễn phí cho phái nữ từ 20:00 - 22:00.
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-primary hover:text-slate-900 text-white text-sm font-bold transition-all shadow-md">
                                            Đặt vé ngay
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Event Card 2 */}
                            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group flex flex-col">
                                <div
                                    className="h-60 bg-cover bg-center relative overflow-hidden"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9ICrki5HvnnCkCyY3bZ8hFCg7Ze4roHFI8N-b5zfDBhuNlVN87c6CanvzjULUIVEf3o8U9qmcSEDaB0KogsZ_OFlbFBIjLIk0Xk2TEOCFJsc4iA0HcXKPosE39PZV49YzzqHjRP7HGvreTG_-wk_F0dIZYHgFMFr1NT9tLz3Wue6Qrq5TRYfUnQ7_VmuJcU_MP4Q_z6nm6ukt_wUvjmKSYnX6YXwaPs4W6ECNAwDCe0OKEym1OHt5LGRy8CPAuB96eGQ--PWj-lw")',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute top-4 left-4 bg-primary text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        Hàng tuần
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <h3 className="text-slate-900 text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            Acoustic Sunset
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                            <span className="material-symbols-outlined text-lg">schedule</span>
                                            <span>17:00 - 19:30</span>
                                        </div>
                                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                                            Thả hồn vào những giai điệu acoustic mộc mạc trong khung giờ
                                            vàng hoàng hôn. Happy Hour giảm giá 50% cocktail.
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <button className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-primary text-slate-600 hover:text-primary text-sm font-bold transition-all">
                                            Xem lịch diễn
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Event Card 3 */}
                            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group flex flex-col">
                                <div
                                    className="h-60 bg-cover bg-center relative overflow-hidden"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHAOYGUQXqX03Gq8KbIDkAjBLaHXoS5eGdpu-YwV5TaNF8Un9GVFlJV1xsyHT1Qoyrw7GCUTvZlK-zJSxG97A6BO8b-hGjUb-R60fc6mrB4OiUK7CHA9vIG0qbZIblKuCb2ofkX24omz9W-M7B8X0740pxr1eVESVbDQct9twP5UOFCDF8ZrNSPttDdvyt0LZZ4NVMD492deSpxH53IHi0TGn7fwsKmAOE7w8gzYvn_UW-gCaYdPB5P6B7lwxQnE6PoIw7-F1m3pg")',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide border border-white opacity-90">
                                        31 Tháng 10
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                        <h3 className="text-slate-900 text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            Halloween Beach Night
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                            <span className="material-symbols-outlined text-lg">schedule</span>
                                            <span>19:00 - Khuya</span>
                                        </div>
                                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                                            Đêm hội hóa trang bên bờ biển với giải thưởng cho trang phục ấn tượng nhất.
                                            Special Horror Cocktail Menu.
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <button className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-primary text-slate-600 hover:text-primary text-sm font-bold transition-all">
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="py-12 px-4 bg-white border-t border-slate-100">
                <div className="max-w-[1200px] mx-auto bg-slate-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
                    <div className="relative z-10 text-center md:text-left max-w-xl">
                        <h2 className="text-slate-900 text-2xl md:text-3xl font-black mb-3">
                            Đăng ký nhận thông tin sự kiện
                        </h2>
                        <p className="text-slate-600 font-medium text-base">
                            Nhận lịch biểu diễn và ưu đãi vé sớm nhất qua email của bạn.
                        </p>
                    </div>
                    <div className="relative z-10 flex w-full md:w-auto gap-2 shrink-0 max-w-md">
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="flex-1 h-12 px-4 rounded-full border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <button className="bg-primary text-slate-900 hover:bg-primary-hover h-12 px-6 rounded-full font-bold transition-all shadow-md whitespace-nowrap">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
