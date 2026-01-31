"use client";

import React from "react";
import { Upload as UploadIcon, X, GripVertical, Plus } from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageUploadGridProps {
    value?: string[]; // Array of image URLs
    onChange?: (urls: string[]) => void;
}

// Sortable Image Item Component
function SortableImageItem({
    id,
    url,
    onRemove,
    onReplace
}: {
    id: string;
    url: string;
    onRemove: () => void;
    onReplace: () => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative group"
        >
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                <img
                    src={url}
                    alt="Menu item"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/200?text=Error";
                    }}
                />
            </div>

            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-1 left-1 bg-white/90 rounded p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="w-4 h-4 text-gray-600" />
            </div>

            {/* Action Buttons */}
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Replace Button */}
                <button
                    type="button"
                    onClick={onReplace}
                    className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                    title="Thay thế ảnh"
                >
                    <UploadIcon className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={onRemove}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    title="Xóa ảnh"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export function ImageUploadGrid({ value = [], onChange }: ImageUploadGridProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const replaceInputRef = React.useRef<HTMLInputElement>(null);
    const [replacingIndex, setReplacingIndex] = React.useState<number | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = value.findIndex((url) => url === active.id);
            const newIndex = value.findIndex((url) => url === over.id);
            const newArray = arrayMove(value, oldIndex, newIndex);
            onChange?.(newArray);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Upload all files in parallel and collect URLs
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.url;
                } else {
                    console.error('Upload failed:', await response.text());
                    return null;
                }
            } catch (error) {
                console.error('Upload error:', error);
                return null;
            }
        });

        // Wait for all uploads to complete
        const uploadedUrls = await Promise.all(uploadPromises);

        // Filter out failed uploads and add to existing images
        const validUrls = uploadedUrls.filter((url): url is string => url !== null);
        if (validUrls.length > 0) {
            onChange?.([...value, ...validUrls]);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        onChange?.(value.filter((_, index) => index !== indexToRemove));
    };

    const handleClickReplace = (index: number) => {
        setReplacingIndex(index);
        replaceInputRef.current?.click();
    };

    const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || replacingIndex === null) return;

        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const newImages = [...value];
                newImages[replacingIndex] = data.url;
                onChange?.(newImages);
            } else {
                console.error('Upload failed:', await response.text());
            }
        } catch (error) {
            console.error('Upload error:', error);
        }

        setReplacingIndex(null);
        if (replaceInputRef.current) {
            replaceInputRef.current.value = "";
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            {/* Hidden File Input for Adding */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Hidden File Input for Replacing */}
            <input
                ref={replaceInputRef}
                type="file"
                accept="image/*"
                onChange={handleReplaceFileChange}
                style={{ display: 'none' }}
            />

            {/* Images Grid with Drag and Drop */}
            {value.length > 0 ? (
                <>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={value} strategy={rectSortingStrategy}>
                            <div className={`grid grid-cols-2 gap-3 ${value.length > 4 ? 'max-h-[400px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                                {value.map((url, index) => (
                                    <SortableImageItem
                                        key={url}
                                        id={url}
                                        url={url}
                                        onRemove={() => handleRemoveImage(index)}
                                        onReplace={() => handleClickReplace(index)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {/* Add More Button */}
                    <button
                        type="button"
                        onClick={handleClickUpload}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <Plus className="w-5 h-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">Thêm ảnh</p>
                    </button>

                    <p className="text-sm text-gray-500">
                        💡 Kéo thả để sắp xếp • Có {value.length} ảnh
                    </p>
                </>
            ) : (
                <button
                    type="button"
                    onClick={handleClickUpload}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                >
                    <UploadIcon className="w-10 h-10 mx-auto mb-3" />
                    <p className="font-medium">Chưa có hình ảnh</p>
                    <p className="text-sm mt-1">Nhấp vào nhấn nút + để thêm</p>
                </button>
            )}
        </div>
    );
}
