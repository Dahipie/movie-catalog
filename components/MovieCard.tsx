"use client";
import { Movie, Director } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface Props {
  movie: Movie;
  directors: Director[];
  onDelete: (id: string) => void;
}

export default function MovieCard({ movie, directors, onDelete }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const director = directors.find(d => d.id === movie.directorId);

  let posterUrl = "/posters/placeholder.jpg";
  if (movie.posterPath && !imageError) {
    posterUrl = movie.posterPath;
  }

  const handleDelete = async () => {
    if (confirm(`Удалить фильм "${movie.title}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(movie.id);
      }, 300);
    }
  };

  const shortDescription = movie.description && movie.description.length > 100
    ? movie.description.substring(0, 100) + "..."
    : movie.description;

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden 
        transition-all duration-300 ease-in-out hover-lift hover-scale
        ${isDeleting ? "opacity-0 scale-95 -translate-x-full" : "opacity-100 scale-100 translate-x-0"}
        animate-fade-in-up
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        <div 
          className="relative w-full sm:w-32 h-48 sm:h-auto flex-shrink-0 bg-gray-200 cursor-pointer overflow-hidden"
          onClick={() => router.push(`/movies/${movie.id}`)}
        >
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            onError={() => setImageError(true)}
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
          <p className="text-gray-600">Год: {movie.releaseYear}</p>
          <p className="text-gray-600">Жанр: {movie.genre}</p>
          <p className="text-gray-600">Режиссёр: {director?.fullName || "Неизвестен"}</p>
          
          {shortDescription && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{shortDescription}</p>
          )}
          
          <p className="text-gray-600 mt-2">
            {movie.isBlockbuster ? "⭐ Блокбастер" : "Обычный"}
          </p>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Подробнее
            </button>
            <button
              onClick={() => router.push(`/movies/${movie.id}/edit`)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}