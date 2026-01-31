import { useState, useEffect } from 'react';
import { getMenus, createMenu as apiCreateMenu, updateMenu as apiUpdateMenu, deleteMenu as apiDeleteMenu, getCategories, initialCategories } from '../menu.service';
import { message } from 'antd';

export function useMenu() {
    const [menus, setMenus] = useState<any[]>([]);
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(false);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            // Load both menus and categories
            const [menusData, categoriesData] = await Promise.all([
                getMenus(),
                getCategories() // New function in menu-data
            ]);

            setMenus(menusData);

            // Only update categories if we got data, else fallback to initial
            if (categoriesData && categoriesData.length > 0) {
                setCategories(categoriesData);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            message.error("Không thể tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchMenus();
    }, []);

    const createMenu = async (item: any) => {
        setLoading(true);
        try {
            const newItem = await apiCreateMenu(item);
            setMenus(prev => [newItem, ...prev]);
            message.success("Đã thêm món mới");
            return newItem;
        } catch (error) {
            console.error("Failed to create menu:", error);
            message.error("Thêm món thất bại");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateMenu = async (item: any) => {
        setLoading(true);
        try {
            const updatedItem = await apiUpdateMenu(item);
            setMenus(prev => prev.map(m => m.id === item.id ? updatedItem : m));
            message.success("Đã cập nhật món ăn");
            return updatedItem;
        } catch (error) {
            console.error("Failed to update menu:", error);
            message.error("Cập nhật thất bại");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteMenu = async (id: string) => {
        setLoading(true);
        try {
            await apiDeleteMenu(id);
            setMenus(prev => prev.filter(m => m.id !== id));
            message.success("Đã xóa món ăn");
        } catch (error) {
            console.error("Failed to delete menu:", error);
            message.error("Xóa món thất bại");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        menus,
        categories,
        loading,
        fetchMenus,
        createMenu,
        updateMenu,
        deleteMenu
    };
}
