"use client";
import { useState } from "react";

interface Props {
  onFileUploaded: (path: string) => void;
}

export default function FileUpload({ onFileUploaded }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Можно загружать только изображения");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        onFileUploaded(data.path);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Ошибка загрузки");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-blue-500 hover:text-blue-600"
      >
        Выберите файл
      </label>
      <span className="text-gray-500"> или перетащите его сюда</span>
      {isUploading && <p className="text-gray-500 mt-2">Загрузка...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}