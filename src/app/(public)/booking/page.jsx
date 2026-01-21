"use client";
import React, { useState } from "react";

export default function BookingPage() {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: "2",
        name: "",
        phone: "",
        email: "",
        notes: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Booking Data:", formData);
        setIsSubmitted(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Header Section */}
            <section className="relative w-full py-20 bg-slate-900 border-b border-slate-800">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 text-center items-center">
                        <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-xs font-bold text-primary uppercase tracking-widest mb-4">
                            Reservations
                        </span>
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.02em] mb-6">
                            Đặt Bàn <span className="text-primary">Online</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                            Giữ chỗ tốt nhất cho buổi tối hoàn hảo của bạn. Chúng tôi khuyến khích đặt bàn trước ít nhất 2 giờ.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="w-full py-16">
                <div className="px-4 md:px-10 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[800px] flex-1">

                        {isSubmitted ? (
                            <div className="bg-white p-12 rounded-2xl shadow-xl text-center border border-slate-100 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-4">Đặt bàn thành công!</h2>
                                <p className="text-slate-600 text-lg mb-8">
                                    Cảm ơn bạn đã lựa chọn Airwave Beach Club. Chúng tôi sẽ liên hệ xác nhận trong ít phút.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-8 rounded-xl transition-colors"
                                >
                                    Đặt thêm bàn khác
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                    {/* Section 1: Time & People */}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">1</span>
                                            Thời gian & Số lượng
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700">Ngày</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    required
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900 font-medium"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700">Giờ</label>
                                                <select
                                                    name="time"
                                                    required
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900 font-medium appearance-none"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Chọn giờ</option>
                                                    <option value="16:00">16:00</option>
                                                    <option value="17:00">17:00</option>
                                                    <option value="18:00">18:00</option>
                                                    <option value="19:00">19:00</option>
                                                    <option value="20:00">20:00</option>
                                                    <option value="21:00">21:00</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700">Số khách</label>
                                                <select
                                                    name="guests"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900 font-medium appearance-none"
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">1 người</option>
                                                    <option value="2">2 người</option>
                                                    <option value="3">3 người</option>
                                                    <option value="4">4 người</option>
                                                    <option value="5">5 người</option>
                                                    <option value="6">6 người</option>
                                                    <option value="other">Trên 6 người</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-slate-100" />

                                    {/* Section 2: Contact Info */}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">2</span>
                                            Thông tin liên hệ
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700">Họ và tên</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="Ví dụ: Nguyễn Văn A"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-slate-700">Số điện thoại</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    placeholder="0912 xxx xxx"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <label className="text-sm font-semibold text-slate-700">Email (Tùy chọn)</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="email@example.com"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-slate-100" />

                                    {/* Section 3: Notes */}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">3</span>
                                            Yêu cầu đặc biệt
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            <textarea
                                                rows={4}
                                                name="notes"
                                                placeholder="Bàn view biển, trang trí sinh nhật, dị ứng thức ăn..."
                                                className="p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all text-slate-900 text-sm resize-none"
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button className="w-full h-14 bg-primary hover:bg-primary-hover text-slate-900 font-bold text-lg rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 mt-2">
                                        Xác nhận đặt bàn
                                    </button>
                                </form>
                            </div>
                        )}

                        <p className="text-center text-slate-500 text-sm mt-8">
                            Hoặc gọi trực tiếp qua hotline: <span className="font-bold text-slate-900">+84 912 345 678</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
