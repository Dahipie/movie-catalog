"use client";
import { useEffect, useState } from "react";
import { Director, ApiResponse } from "@/types";
import DirectorCard from "@/components/DirectorCard";
import Pagination from "@/components/Pagination";

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

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Режиссёры</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {directors.map(director => (
          <DirectorCard key={director.id} director={director} onDelete={handleDelete} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}