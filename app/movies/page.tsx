"use client";
import { useEffect, useState } from "react";
import { Movie, Director, ApiResponse } from "@/types";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonCard from "@/components/SkeletonCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedDirectorId, setSelectedDirectorId] = useState("");
  const limit = 5;

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

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 animate-slide-left">🎬 Фильмы</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 animate-slide-right">
        <input
          type="text"
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <select
          value={selectedDirectorId}
          onChange={(e) => {
            setSelectedDirectorId(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">Все режиссёры</option>
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
            <div key={i} className="animate-fade-in-up delay-100" style={{ animationDelay: `${i * 0.1}s` }}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-10 text-gray-500 animate-fade-in">
          😕 Фильмов не найдено
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MovieCard
                movie={movie}
                directors={directors}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      <div className="animate-fade-in-up delay-300">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}