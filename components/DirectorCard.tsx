"use client";
import { Director } from "@/types";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface Props {
  director: Director;
  onDelete: (id: string) => void;
}

export default function DirectorCard({ director, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const photoUrl = director.photoPath && !imageError 
    ? director.photoPath 
    : "/directors/placeholder.jpg";

  const handleDelete = () => {
    if (confirm(`Удалить режиссёра "${director.fullName}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(director.id);
      }, 300);
    }
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out
        ${isDeleting ? "opacity-0 scale-95 -translate-x-full" : "opacity-100 scale-100 translate-x-0"}
      `}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Фото режиссёра */}
        <div className="relative w-full sm:w-32 h-48 sm:h-auto flex-shrink-0 bg-gray-200">
          <Image
            src={photoUrl}
            alt={director.fullName}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        
        {/* Информация о режиссёре */}
        <div className="p-4 flex-1">
          <h3 className="text-xl font-semibold mb-2">{director.fullName}</h3>
          <p className="text-gray-600">Год рождения: {director.birthYear}</p>
          <p className="text-gray-600">Страна: {director.country}</p>
          <p className="text-gray-600">
            Статус: {director.isActive ? "Активен" : "Завершил карьеру"}
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/directors/${director.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Подробнее
            </Link>
            <Link
              href={`/directors/${director.id}/edit`}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Редактировать
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}