"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  directorId: string;
  posterPath?: string;
  isBlockbuster: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Director {
  id: string;
  fullName: string;
  birthYear: number;
  country: string;
  isActive: boolean;
  photoPath?: string;
  movies?: Movie[];
  createdAt: string;
  updatedAt: string;
}

export default function DirectorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const res = await fetch(`/api/directors/${id}`);
        if (!res.ok) throw new Error("Режиссёр не найден");
        const data = await res.json();
        setDirector(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchDirector();
  }, [id]);

  // ⬇️ ЗДЕСЬ ЗАМЕНА ⬇️
  if (loading) {
    return <div className="text-center py-10 text-gray-500">⏳ Загрузка режиссёра...</div>;
  }

  if (!director) {
    return <div className="text-center py-10 text-red-500">Режиссёр не найден</div>;
  }

  const photoUrl = director.photoPath && !imageError 
    ? director.photoPath 
    : "/directors/placeholder.jpg";

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-500 hover:text-blue-600"
      >
        ← Назад
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-96 md:h-auto flex-shrink-0 bg-gray-200">
            <Image
              src={photoUrl}
              alt={director.fullName}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold mb-4">{director.fullName}</h1>
            <div className="space-y-2">
              <p><strong>Год рождения:</strong> {director.birthYear}</p>
              <p><strong>Страна:</strong> {director.country}</p>
              <p><strong>Статус:</strong> {director.isActive ? "Активен" : "Завершил карьеру"}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href={`/directors/${director.id}/edit`}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Редактировать
              </Link>
              <button
                onClick={() => router.push("/directors")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                К списку режиссёров
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">🎬 Фильмы режиссёра</h2>
      
      {director.movies && director.movies.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {director.movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600">Год: {movie.releaseYear}</p>
              <p className="text-gray-600">Жанр: {movie.genre}</p>
              <Link
                href={`/movies/${movie.id}`}
                className="inline-block mt-3 text-blue-500 hover:text-blue-600"
              >
                Подробнее о фильме →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">У этого режиссёра пока нет фильмов</p>
      )}
    </div>
  );
}