
import axios from "axios";

const API_URL = "/api/v1/gallery-categories";

export const getGalleryCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createGalleryCategory = async (data: { name: string; description?: string }) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateGalleryCategory = async (id: string, data: { name: string; description?: string }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteGalleryCategory = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
