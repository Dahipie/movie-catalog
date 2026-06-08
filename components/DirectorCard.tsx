"use client";
import { Director } from "@/types";
import Link from "next/link";
import { useState } from "react";

interface Props {
  director: Director;
  onDelete: (id: string) => void;
}

export default function DirectorCard({ director, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (confirm(`Удалить режиссёра "${director.fullName}"?`)) {
      setIsDeleting(true);
      onDelete(director.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all ${isDeleting ? "bg-red-100 scale-95" : ""}`}>
      <h3 className="text-xl font-semibold mb-2">{director.fullName}</h3>
      <p className="text-gray-600">Год рождения: {director.birthYear}</p>
      <p className="text-gray-600">Страна: {director.country}</p>
      <p className="text-gray-600">
        Статус: {director.isActive ? "Активен" : "Завершил карьеру"}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/directors/${director.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Подробнее
        </Link>
        <Link
          href={`/directors/${director.id}/edit`}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Редактировать
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}