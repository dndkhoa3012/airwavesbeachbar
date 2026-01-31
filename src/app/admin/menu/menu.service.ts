
// Helper for API calls
const API_URL = '/api/v1';

export const getMenus = async () => {
    const res = await fetch(`${API_URL}/menus`);
    if (!res.ok) throw new Error('Failed to fetch menus');
    return res.json();
};

export const createMenu = async (item: any) => {
    const res = await fetch(`${API_URL}/menus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create menu');
    return res.json();
};

export const updateMenu = async (item: any) => {
    const res = await fetch(`${API_URL}/menus/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update menu');
    return res.json();
};

export const deleteMenu = async (id: string) => {
    const res = await fetch(`${API_URL}/menus/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete menu');
    return res.json();
};

// Fetch categories from API directly instead of hardcoded
export const getCategories = async () => {
    const res = await fetch(`${API_URL}/menu-categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export const createCategory = async (data: any) => {
    const res = await fetch(`${API_URL}/menu-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
};

export const updateCategory = async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/menu-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return res.json();
};

export const deleteCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/menu-categories/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete category');
    }
    return res.json();
};

// Keep initial for fallback or seeding if needed, 
// but UI should ideally load from API.
export const initialCategories = [
    { id: "cat1", name: "Signature Cocktails", color: "purple" },
    { id: "cat2", name: "Bia & Rượu", color: "blue" },
    { id: "cat3", name: "Món Khai Vị", color: "orange" },
    { id: "cat4", name: "Món Chính", color: "volcano" },
    { id: "cat5", name: "Tráng Miệng", color: "cyan" },
];


