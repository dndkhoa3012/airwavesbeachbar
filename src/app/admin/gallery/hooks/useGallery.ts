import { useState, useEffect } from "react";
import { message } from "antd";
import { getGalleryCategories } from "@/app/admin/gallery/gallery-categories.service";

export interface CollectionType {
    id: string;
    name: string;
    description?: string;
    coverImage?: string;
    categoryId: string;
    category?: {
        id: string;
        name: string;
        color?: string;
    };
    images: { id: string; src: string }[];
    _count?: {
        images: number;
    };
    createdAt: string;
}

export const useGallery = () => {
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [colRes, catRes] = await Promise.all([
                fetch('/api/v1/gallery-collections', { cache: 'no-store' }),
                getGalleryCategories()
            ]);

            if (colRes.ok) {
                const data = await colRes.json();
                setCollections(data);
            }
            setCategories(catRes || []);

        } catch (error) {
            messageApi.error("Lỗi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/v1/gallery-collections/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                messageApi.success("Đã xóa bộ sưu tập");
                fetchData();
                return true;
            } else {
                messageApi.error("Không thể xóa");
                return false;
            }
        } catch (error) {
            messageApi.error("Lỗi khi xóa");
            return false;
        }
    };

    const handleCreate = async (payload: any) => {
        setLoading(true);
        try {
            const res = await fetch('/api/v1/gallery-collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                messageApi.success("Đã tạo bộ sưu tập mới");
                fetchData();
                return true;
            } else {
                messageApi.error("Lỗi khi tạo");
                return false;
            }
        } catch (error) {
            messageApi.error("Lỗi kết nối");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string, payload: any) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/gallery-collections/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                messageApi.success("Đã cập nhật bộ sưu tập");
                fetchData();
                return true;
            } else {
                messageApi.error("Không thể cập nhật");
                return false;
            }
        } catch (error) {
            messageApi.error("Lỗi cập nhật");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        collections,
        categories,
        loading,
        fetchData,
        handleDelete,
        handleCreate,
        handleUpdate,
        contextHolder
    };
};
