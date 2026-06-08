"use client";
import { useEffect, useState } from "react";
import { Movie, Director, ApiResponse } from "@/types";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedDirectorId, setSelectedDirectorId] = useState("");
  const limit = 5;

  // Функция загрузки фильмов
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) params.append("search", search);
      if (selectedDirectorId) params.append("directorId", selectedDirectorId);

      const res = await fetch(`/api/movies?${params}`);
      const data: ApiResponse<Movie> = await res.json();
      setMovies(data.items);
      setTotalPages(data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка режиссёров для фильтра
  useEffect(() => {
    fetch("/api/directors?limit=100")
      .then(res => res.json())
      .then(data => setDirectors(data.items))
      .catch(console.error);
  }, []);

  // Загрузка фильмов при изменении параметров
  useEffect(() => {
    fetchMovies();
  }, [page, search, selectedDirectorId]);

  const handleDelete = async (id: string) => {
    if (confirm("Удалить фильм?")) {
      try {
        await fetch(`/api/movies/${id}`, { method: "DELETE" });
        fetchMovies(); // Обновляем список
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/movies/${id}/restore`, { method: "PATCH" });
      if (res.ok) {
        alert("Фильм восстановлен!");
        fetchMovies(); // Обновляем список
      } else {
        alert("Не удалось восстановить фильм");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при восстановлении");
    }
  };

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🎬 Фильмы</h1>
      
      {/* Поиск и фильтрация */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 border rounded px-3 py-2"
        />
        <select
          value={selectedDirectorId}
          onChange={(e) => {
            setSelectedDirectorId(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">Все режиссёры</option>
          {directors.map(director => (
            <option key={director.id} value={director.id}>
              {director.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Список фильмов */}
      {movies.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Фильмов не найдено
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              directors={directors}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}