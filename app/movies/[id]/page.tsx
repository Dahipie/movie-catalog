"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Movie, Director } from "@/types";
import Image from "next/image";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();
        setMovie(data);
        
        if (data.directorId) {
          const directorRes = await fetch(`/api/directors/${data.directorId}`);
          const directorData = await directorRes.json();
          setDirector(directorData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchMovie();
  }, [id]);

  // ⬇️ ЗДЕСЬ ЗАМЕНА ⬇️
  if (loading) {
    return <div className="text-center py-10 text-gray-500">⏳ Загрузка фильма...</div>;
  }
  
  if (!movie) {
    return <div className="text-center py-10 text-red-500">Фильм не найден</div>;
  }

  const posterUrl = movie.posterPath && !imageError 
    ? movie.posterPath 
    : "/posters/placeholder.jpg";

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Не указано";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} мин`;
    if (mins === 0) return `${hours} ч`;
    return `${hours} ч ${mins} мин`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-500 hover:text-blue-600 flex items-center gap-1"
      >
        ← Назад к списку
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-96 md:h-auto flex-shrink-0 bg-gray-200">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          
          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.isBlockbuster && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  ⭐ Блокбастер
                </span>
              )}
              {movie.rating && (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {movie.rating}
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500 text-sm">📅 Год выпуска</p>
                  <p className="font-medium">{movie.releaseYear}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">🎭 Жанр</p>
                  <p className="font-medium">{movie.genre}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">⏱️ Длительность</p>
                  <p className="font-medium">{formatDuration(movie.duration)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">🌍 Страна</p>
                  <p className="font-medium">{movie.country || "Не указана"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">🎬 Режиссёр</p>
                  <p className="font-medium">{director?.fullName || "Неизвестен"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">💰 Бюджет</p>
                  <p className="font-medium">{movie.budget || "Не указан"}</p>
                </div>
              </div>
            </div>
            
            {movie.description && (
              <div className="mt-6 pt-4 border-t">
                <h2 className="text-xl font-semibold mb-2">📖 Сюжет</h2>
                <p className="text-gray-700 leading-relaxed">{movie.description}</p>
              </div>
            )}
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => router.push(`/movies/${movie.id}/edit`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                ✏️ Редактировать
              </button>
              <button
                onClick={() => router.push("/movies")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                🎬 Все фильмы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}