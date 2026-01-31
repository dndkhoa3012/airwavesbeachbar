
// Helper for API calls
const API_URL = '/api/v1';

export const getEventCategories = async () => {
    const res = await fetch(`${API_URL}/event-categories`);
    if (!res.ok) throw new Error('Failed to fetch event categories');
    return res.json();
};

export const createEventCategory = async (data: any) => {
    const res = await fetch(`${API_URL}/event-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create event category');
    return res.json();
};

export const updateEventCategory = async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/event-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update event category');
    return res.json();
};

export const deleteEventCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/event-categories/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete event category');
    }
    return res.json();
};
