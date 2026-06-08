"use client";
import { useEffect, useState } from "react";
import { Director, ApiResponse } from "@/types";
import DirectorCard from "@/components/DirectorCard";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
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

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 animate-slide-left">🎭 Режиссёры</h1>
      
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-fade-in-up delay-100" style={{ animationDelay: `${i * 0.1}s` }}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {directors.map((director, index) => (
            <div 
              key={director.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DirectorCard director={director} onDelete={handleDelete} />
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