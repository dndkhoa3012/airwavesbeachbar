"use client";

import React, { useState } from "react";
import { Modal, Upload, Button, Table, message, Alert } from "antd";
import { Inbox, FileSpreadsheet, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

interface MenuImportProps {
    open: boolean;
    onCancel: () => void;
    onImport: (data: any[]) => Promise<void>;
}

export const MenuImport: React.FC<MenuImportProps> = ({
    open,
    onCancel,
    onImport,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewData, setPreviewData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            if (data) {
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Map keys strictly if needed, or assume headers match expectation
                // Expected headers: 'Tên món', 'Giá', 'Danh mục', 'Mô tả', 'URL hình ảnh'
                // Mapping to: name, price, category, desc, image

                const mappedData = jsonData.map((row: any) => ({
                    name: row['Tên món'] || row['name'],
                    price: (row['Giá'] || row['price'])?.toString(),
                    category: row['Danh mục'] || row['category'],
                    desc: row['Mô tả'] || row['desc'],
                    image: row['URL hình ảnh'] || row['image']
                })).filter(item => item.name && item.price); // Basic validation

                setPreviewData(mappedData);
                setFileList([file]);
            }
        };
        reader.readAsBinaryString(file);
        return false; // Prevent auto upload
    };

    const handleImport = async () => {
        if (previewData.length === 0) {
            messageApi.error("Không có dữ liệu hợp lệ để nhập!");
            return;
        }

        setLoading(true);
        try {
            await onImport(previewData);
            messageApi.success(`Đã nhập thành công ${previewData.length} món!`);
            handleCancel();
        } catch (error) {
            console.error(error);
            messageApi.error("Có lỗi xảy ra khi nhập dữ liệu.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFileList([]);
        setPreviewData([]);
        onCancel();
    };

    const handleDownloadTemplate = () => {
        const templateData = [
            {
                'Tên món': 'Cà phê sữa',
                'Danh mục': 'Đồ uống',
                'Giá': '35000',
                'Mô tả': 'Cà phê nguyên chất pha sữa đặc'
            }
        ];
        const worksheet = XLSX.utils.json_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
        XLSX.writeFile(workbook, "Mau_Nhap_Menu.xlsx");
        messageApi.success("Đã tải file mẫu!");
    };

    const columns = [
        { title: 'Tên món', dataIndex: 'name', key: 'name' },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'Giá', dataIndex: 'price', key: 'price' },
    ];

    return (
        <>
            {contextHolder}
            <Modal
                title="Nhập menu từ Excel"
                open={open}
                onCancel={handleCancel}
                width={700}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleImport}
                        disabled={previewData.length === 0}
                        loading={loading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Nhập {previewData.length > 0 ? `(${previewData.length} món)` : ''}
                    </Button>,
                ]}
            >
                <div className="flex flex-col gap-4 py-4">
                    <Alert
                        title="Hướng dẫn"
                        description="File Excel cần có các cột: 'Tên món', 'Danh mục', 'Giá'. Các cột tùy chọn: 'Mô tả'."
                        type="info"
                        showIcon
                        action={
                            <Button size="small" type="primary" onClick={handleDownloadTemplate} ghost>
                                Tải file mẫu
                            </Button>
                        }
                    />

                    {previewData.length === 0 ? (
                        <Upload.Dragger
                            name="file"
                            multiple={false}
                            maxCount={1}
                            accept=".xlsx, .xls"
                            beforeUpload={handleUpload}
                            fileList={fileList}
                            className="bg-slate-50"
                        >
                            <p className="ant-upload-drag-icon">
                                <FileSpreadsheet className="w-12 h-12 mx-auto text-green-500" />
                            </p>
                            <p className="ant-upload-text">Kéo thả file Excel vào đây hoặc click để chọn</p>
                            <p className="ant-upload-hint">Hỗ trợ định dạng .xlsx, .xls</p>
                        </Upload.Dragger>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-slate-700">Xem trước dữ liệu:</span>
                                <Button size="small" type="text" danger onClick={() => { setPreviewData([]); setFileList([]); }}>
                                    Chọn file khác
                                </Button>
                            </div>
                            <Table
                                dataSource={previewData}
                                columns={columns}
                                size="small"
                                scroll={{ y: 300 }}
                                pagination={false}
                                rowKey={(record) => record.name + record.category}
                            />
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};
