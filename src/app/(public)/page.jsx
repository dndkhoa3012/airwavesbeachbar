"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/v1/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.slice(0, 2)); // Get first 2 events
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANPwTyjbQsQoknQ34V8LK86yJ0mYfmdveyvs3Vybc6MLBFdkMIQpQ3cLUUp2qrLLbVOs0PjvbHFXm4YNg7lbvEg5fv6X2UBPuAdrfHwPS8JJpOCAO7gK4kImsGGgFUasyN24CY4yNKG4K0IHhT5KsDe_goSJuOuaOR2qPiuDIRRaCZJ-zpJ2a8jf3uII6zeOhB8DV79trJDH5v9eBrvqJlm0xR5r0yFpl4syheDdXQ1UXHhv35Ag49mF1gpmXQWknMFhuFUIpoMHU")' }}
                ></div>
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                </div>
            </section>
            <section className="w-full py-10 md:py-16 bg-white">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
                            <div className="w-full md:w-1/2">
                                <div className="grid grid-cols-2 gap-6">
                                    <div
                                        className="w-full h-72 bg-center bg-cover rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-500"
                                        data-alt="Close up of colorful tropical cocktails with fruit garnishes"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAT2A9ZQvkrUrPokTzNKj6RZqhrdt2qR5N-ePw7mfsf3fM1wzpSk3wOHPY9LJcXi0wo6jgB3uG3y4GJFkD8klCGE6W8pbSxS-_HfELVkygCPKKjI3cjtKce7Vg2BnHf_nla3yE5-MNRBz0MpIsjMoPe7PnQ7hbZdcaPYikN-1dCJ5xVojbamu6RD_lLojhBviu2Zpv64kwfXFE53d-R02x4WRNJPNc4VdTpnreE1TB6QTK6xXsX5wTmEmwJf2S1UZAzgItl2gzBe6I")',
                                        }}
                                    ></div>
                                    <div
                                        className="w-full h-72 bg-center bg-cover rounded-2xl mt-12 shadow-lg hover:-translate-y-1 transition-transform duration-500"
                                        data-alt="People dancing and enjoying music at a beach party at night"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrN38An2vv-nOQNJVLTcsKyfHiCbljRpe_lUrOeDyRr5u9HsrbzCrrf19UaTcGpC8oVdF8oGlzYe8dEk3Q5Mmld5Pdh73JlidxTfhcRp9xXHoeT8ARQeC3aAumnEKsCxlNsdUBUFyW436-4CtxAO1To8EVV7jK4AxbXE1LPKieLalwhZYePdwU7z2oi_1amsJsItmbYK-v7ZZnRKYsPOQPHwEPDM5ee9Sci8BT67QhDpGr9XjeSR8nBxpyi1WGs71oC-702fXdV74")',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
                                <div className="flex flex-col gap-4">
                                    <span className="text-primary font-bold tracking-widest uppercase text-xs">
                                        Về chúng tôi
                                    </span>
                                    <h2 className="text-slate-900 text-4xl md:text-5xl font-black leading-[1.1] tracking-[-0.02em]">
                                        Cuộc sống đảo ngọc, <br />
                                        <span className="text-slate-400 font-bold">
                                            Nâng tầm trải nghiệm
                                        </span>
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed font-light">
                                        Hãy thư giãn với đôi chân trần trên cát trắng mịn. Airwaves
                                        Beach Club mang đến vẻ đẹp tinh tế, nguyên liệu địa phương
                                        tươi ngon nhất, và không gian âm nhạc đẳng cấp quốc tế.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            water_full
                                        </span>
                                        <div>
                                            <span className="block text-slate-900 font-bold">
                                                Vị trí đắc địa
                                            </span>
                                            <span className="text-slate-500 text-sm">
                                                Tầm nhìn biển 180 độ không giới hạn
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            music_note
                                        </span>
                                        <div>
                                            <span className="block text-slate-900 font-bold">
                                                Âm thanh đỉnh cao
                                            </span>
                                            <span className="text-slate-500 text-sm">
                                                Hệ thống loa hiện đại cho trải nghiệm sống động
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/about" className="flex w-fit cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-slate-900 hover:bg-slate-800 transition-all text-white text-sm font-bold mt-4 group shadow-lg shadow-slate-200">
                                    <span className="truncate">Câu chuyện của chúng tôi</span>
                                    <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-20 bg-slate-50">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight mb-4">
                                Điểm nhấn khác biệt
                            </h2>
                            <p className="text-slate-600 text-lg font-light">
                                Những điều tinh túy nhất tạo nên thương hiệu Airwaves Beach Club
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="flex flex-col items-center gap-6 text-center group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-48 p-1 rounded-full bg-white border border-slate-200 shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden relative z-10">
                                        <div
                                            className="w-full h-full rounded-full bg-center bg-cover"
                                            data-alt="Bartender pouring a colorful cocktail into a glass"
                                            style={{
                                                backgroundImage:
                                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyGaXFQQGecI8XGAVsmWDsKDnHVS6qGSaafIChAJUOdLsOG6k6m7GWp-pTCY1U-4kYOnMMtLsey_DinWdTsn3io45onSekgZ8064wjOfFe3fqg_HqgWC0RmeZr949bpxGgLcufs9oYN_0k4tdK13kQezGJxEIR2r22pzpqZ3FvBF88EdPgBMmx7KWH_qNL3OX6Ohzc3JWKMxpHqn2Dv8fk_idzLkWPGyrs_OKLAfqK7eIQTG43AJIEEIN0jj-UowexQYPy3g6LaUo")',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        Cocktail Signature
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed px-4">
                                        Hương vị độc bản được pha chế bởi những bartender hàng đầu.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-6 text-center group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-48 p-1 rounded-full bg-white border border-slate-200 shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden relative z-10">
                                        <div
                                            className="w-full h-full rounded-full bg-center bg-cover"
                                            data-alt="DJ playing music at a beach club with colorful lights"
                                            style={{
                                                backgroundImage:
                                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHAOYGUQXqX03Gq8KbIDkAjBLaHXoS5eGdpu-YwV5TaNF8Un9GVFlJV1xsyHT1Qoyrw7GCUTvZlK-zJSxG97A6BO8b-hGjUb-R60fc6mrB4OiUK7CHA9vIG0qbZIblKuCb2ofkX24omz9W-M7B8X0740pxr1eVESVbDQct9twP5UOFCDF8ZrNSPttDdvyt0LZZ4NVMD492deSpxH53IHi0TGn7fwsKmAOE7w8gzYvn_UW-gCaYdPB5P6B7lwxQnE6PoIw7-F1m3pg")',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        Sự Kiện Đẳng Cấp
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed px-4">
                                        Điểm đến của những DJ quốc tế và các bữa tiệc theo chủ đề.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-6 text-center group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-48 p-1 rounded-full bg-white border border-slate-200 shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden relative z-10">
                                        <div
                                            className="w-full h-full rounded-full bg-center bg-cover"
                                            data-alt="View of the ocean from a beach chair on the sand"
                                            style={{
                                                backgroundImage:
                                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZZbq06yMIJiyptrBKGwGUo3ZT4sHsLVnQ2vDmlZKgQtC9_7tlIVjxOF8HEj3qxfPc83a2-7dx5fcqd_OSEWUhPcrxVxKs0ZrQx1VrKc8ZpzreR6jijNLfcr8fJy_o0LRRg9P2sdO68fGBTwh_CAsMlwRnqEQTxs3SEaGG9N82Yn9jeJ_xi4hDlsgkQblaVQkvPiYs_EwtP6upbC_M72p621wuwGNrCIqnH2zWWK6FFbcS8OrTNFLHhdhpSVGp7Lj5rC8GrxupwE")',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        View Biển Vô Cực
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed px-4">
                                        Không gian mở đón trọn gió biển và ánh hoàng hôn rực rỡ.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-20 bg-white">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <div className="flex items-end justify-between mb-10 px-2 border-b border-slate-100 pb-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                                    Lịch trình
                                </span>
                                <h2 className="text-slate-900 text-3xl font-black leading-tight">
                                    Sự kiện sắp tới
                                </h2>
                            </div>
                            <Link
                                className="text-slate-500 hover:text-primary transition-colors text-sm font-bold flex items-center gap-2"
                                href="/events"
                            >
                                Xem tất cả{" "}
                                <span className="material-symbols-outlined text-lg">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {loading ? (
                                <div className="col-span-2 flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                                </div>
                            ) : events.length > 0 ? (
                                events.map(event => (
                                    <Link key={event.id} href={`/events/${event.id}`} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group">
                                        <div
                                            className="h-60 bg-cover bg-center relative overflow-hidden"
                                            style={{ backgroundImage: `url("${event.image}")` }}
                                        >
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wide border border-white">
                                                {event.date}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-slate-900 text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                                                {event.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                                {event.description}
                                            </p>
                                            <div className="w-full py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-primary text-slate-600 hover:text-primary text-sm font-bold transition-all text-center">
                                                Chi tiết &amp; Đặt vé
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-2 text-center text-slate-500 py-10">Chưa có sự kiện nào.</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 px-4 bg-white">
                <div className="max-w-[1200px] mx-auto bg-primary rounded-[2rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-green-500/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
                    <div className="relative z-10 text-center md:text-left max-w-2xl">
                        <h2 className="text-slate-900 text-3xl md:text-5xl font-black mb-4 tracking-tight">
                            Sẵn sàng cho đêm nay?
                        </h2>
                        <p className="text-slate-800 font-medium text-lg opacity-80">
                            Đặt bàn ngay để có vị trí đẹp nhất ngắm hoàng hôn và tận hưởng
                            không khí tuyệt vời.
                        </p>
                    </div>
                    <div className="relative z-10 flex gap-4 shrink-0">
                        <button className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Đặt bàn ngay
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
