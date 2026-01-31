"use client";
import React, { useState } from "react";
import { FloatButton, Badge } from "antd";
import { MessageOutlined, RobotOutlined, CloseOutlined, SendOutlined, FacebookFilled } from "@ant-design/icons";

// Custom Zalo Icon since AntD doesn't have it
const ZaloIcon = () => (
    <div className="w-5 h-5 flex items-center justify-center font-bold text-[10px] text-white bg-blue-500 rounded-full">Z</div>
);

// Custom Messenger Icon
const MessengerIcon = () => (
    <div className="w-5 h-5 flex items-center justify-center font-bold text-white bg-[#0084FF] rounded-full" style={{ fontSize: '10px' }}>M</div>
);

export default function ChatWidget() {
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn? (Đặt bàn, Menu, Sự kiện...)' }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
        const userInput = inputValue;
        setInputValue("");

        setTimeout(() => {
            let reply = "Cảm ơn bạn đã liên hệ. Nhân viên sẽ phản hồi sớm nhất!";
            if (userInput.toLowerCase().includes("đặt bàn")) {
                reply = "Bạn muốn đặt bàn cho bao nhiêu người và vào thời gian nào ạ?";
            } else if (userInput.toLowerCase().includes("menu") || userInput.toLowerCase().includes("thực đơn")) {
                reply = "Bạn có thể xem thực đơn chi tiết tại trang Menu của chúng tôi.";
            } else if (userInput.toLowerCase().includes("sự kiện")) {
                reply = "Tuần này chúng tôi có Full Moon Party vào tối thứ 6. Bạn có quan tâm không?";
            }
            setMessages(prev => [...prev, { type: 'bot', text: reply }]);
        }, 1000);
    };

    return (
        <>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24, bottom: 90 }}
                icon={<MessageOutlined />}
            >
                <FloatButton
                    icon={<ZaloIcon />}
                    tooltip={<div>Chat Zalo</div>}
                    href="https://zalo.me/0912345678"
                    target="_blank"
                />
                <FloatButton
                    icon={<MessengerIcon />}
                    tooltip={<div>Messenger</div>}
                    href="https://m.me/airwavesbeachclub"
                    target="_blank"
                />
                <FloatButton
                    icon={<RobotOutlined />}
                    tooltip={<div>Trợ lý AI</div>}
                    onClick={() => setIsBotOpen(!isBotOpen)}
                />
            </FloatButton.Group>

            {/* AI Bot Window */}
            {isBotOpen && (
                <div className="fixed bottom-40 right-6 z-50 w-[320px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-full">
                                <RobotOutlined style={{ fontSize: '20px', color: '#4ade80' }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Airwaves AI Assistant</h3>
                                <span className="flex items-center gap-1 text-[10px] text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsBotOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <CloseOutlined />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                    ? 'bg-primary text-slate-900 font-medium rounded-tr-sm'
                                    : 'bg-white border border-slate-200 text-slate-600 rounded-tl-sm shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-slate-100 bg-white">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            className="flex gap-2"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-slate-900"
                            />
                            <button type="submit" className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-primary hover:text-slate-900 transition-colors flex items-center justify-center">
                                <SendOutlined />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
