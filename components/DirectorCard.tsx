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
  const [isHovered, setIsHovered] = useState(false);

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
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover-lift
        ${isDeleting ? "opacity-0 scale-95 -translate-x-full" : "opacity-100 scale-100 translate-x-0"}
        animate-fade-in-up
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Фото */}
        <div className="relative w-full sm:w-28 md:w-32 h-48 sm:h-auto flex-shrink-0 bg-gray-200 overflow-hidden">
          <Image
            src={photoUrl}
            alt={director.fullName}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 112px, 128px"
          />
        </div>
        
        {/* Информация */}
        <div className="p-3 md:p-4 flex-1">
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{director.fullName}</h3>
          
          <div className="space-y-1 text-sm md:text-base">
            <p className="text-gray-600">🎂 {director.birthYear}</p>
            <p className="text-gray-600">🌍 {director.country}</p>
            <p className="text-gray-600">
              {director.isActive ? "✅ Активен" : "❌ Завершил карьеру"}
            </p>
          </div>
          
          {/* Кнопки */}
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
            <Link
              href={`/directors/${director.id}`}
              className="bg-blue-500 text-white px-2 md:px-3 py-1.5 md:py-1 rounded text-sm hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-95 inline-block"
            >
              Подробнее
            </Link>
            <Link
              href={`/directors/${director.id}/edit`}
              className="bg-yellow-500 text-white px-2 md:px-3 py-1.5 md:py-1 rounded text-sm hover:bg-yellow-600 transition-all duration-200 hover:scale-105 active:scale-95 inline-block"
            >
              Редактировать
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white px-2 md:px-3 py-1.5 md:py-1 rounded text-sm hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isDeleting ? "..." : "Удалить"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}