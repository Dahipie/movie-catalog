"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Director {
  id: string;
  fullName: string;
}

export default function CreateMoviePage() {
  const router = useRouter();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    releaseYear: 2024,
    genre: "",
    directorId: "",
    isBlockbuster: false,
  });

  useEffect(() => {
    fetch("/api/directors?limit=100")
      .then(res => res.json())
      .then(data => setDirectors(data.items))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push("/movies");
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch {
      setError("Ошибка при создании");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Добавить фильм</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Название *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Год выпуска *</label>
          <input
            type="number"
            required
            min="1888"
            max="2026"
            className="w-full border rounded px-3 py-2"
            value={formData.releaseYear}
            onChange={e => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Жанр *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.genre}
            onChange={e => setFormData({ ...formData, genre: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Режиссёр *</label>
          <select
            required
            className="w-full border rounded px-3 py-2"
            value={formData.directorId}
            onChange={e => setFormData({ ...formData, directorId: e.target.value })}
          >
            <option value="">Выберите режиссёра</option>
            {directors.map(director => (
              <option key={director.id} value={director.id}>
                {director.fullName}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBlockbuster}
              onChange={e => setFormData({ ...formData, isBlockbuster: e.target.checked })}
            />
            Блокбастер
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
    </div>
  );
}