"use client";
import { useEffect, useState } from "react";
import { Movie, Director, ApiResponse } from "@/types";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedDirectorId, setSelectedDirectorId] = useState("");
  const limit = 10;

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

  useEffect(() => {
    fetch("/api/directors?limit=100")
      .then(res => res.json())
      .then(data => setDirectors(data.items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [page, search, selectedDirectorId]);

  const handleDelete = async (id: string) => {
    if (confirm("Удалить фильм?")) {
      try {
        await fetch(`/api/movies/${id}`, { method: "DELETE" });
        fetchMovies();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ⬇️ ЗДЕСЬ ЗАМЕНА ⬇️
  if (loading) {
    return <div className="text-center py-10 text-gray-500">⏳ Загрузка...</div>;
  }

  return (
    <div className="pb-8">
      <h1 className="text-2xl font-bold mb-4 animate-slide-left">🎬 Фильмы</h1>
      
      <div className="mb-4 animate-slide-right">
        <input
          type="text"
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 animate-slide-right delay-100">
        <select
          value={selectedDirectorId}
          onChange={(e) => {
            setSelectedDirectorId(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">🎭 Все режиссёры</option>
          {directors.map(director => (
            <option key={director.id} value={director.id}>
              {director.fullName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-64 skeleton" />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          😕 Фильмов не найдено
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              directors={directors}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}