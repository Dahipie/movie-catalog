"use client";
import { useEffect, useState } from "react";
import { Director, ApiResponse } from "@/types";
import DirectorCard from "@/components/DirectorCard";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";

export default function DirectorsPage() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchDirectors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/directors?page=${page}&limit=${limit}`);
      const data: ApiResponse<Director> = await res.json();
      setDirectors(data.items);
      setTotalPages(data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectors();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (confirm("Удалить режиссёра?")) {
      try {
        await fetch(`/api/directors/${id}`, { method: "DELETE" });
        fetchDirectors();
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
      <h1 className="text-2xl font-bold mb-4 animate-slide-left">🎭 Режиссёры</h1>
      
      {directors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500">😕 Режиссёров не найдено</p>
          <button
            onClick={() => window.location.href = "/directors/new"}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ➕ Добавить первого режиссёра
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {directors.map((director) => (
            <DirectorCard
              key={director.id}
              director={director}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}