import axios from "axios";

const API_URL = "/api/v1/banners";

export interface BannerFormData {
    pageType: string;
    deviceType?: string;
    title?: string;
    subtitle?: string;
    imageUrls: string[];
    altText?: string;
    isActive?: boolean;
    order?: number;
}

export const getBanners = async (pageType?: string, deviceType?: string) => {
    let url = API_URL;
    const params = new URLSearchParams();
    if (pageType) params.append('pageType', pageType);
    if (deviceType) params.append('deviceType', deviceType);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await axios.get(url);
    return response.data;
};

export const createBanner = async (data: BannerFormData) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateBanner = async (id: string, data: Partial<BannerFormData>) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteBanner = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
