"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";

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
    releaseYear: new Date().getFullYear(),
    genre: "",
    directorId: "",
    description: "",
    duration: 120,
    budget: "",
    rating: "PG-13",
    country: "",
    isBlockbuster: false,
    posterPath: "",
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
        setError(data.error || "Ошибка при создании");
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
        {/* Загрузка постера */}
        <div>
          <label className="block mb-1 font-medium">Постер фильма</label>
          <FileUpload onFileUploaded={(path) => setFormData({ ...formData, posterPath: path })} />
          {formData.posterPath && (
            <p className="text-sm text-green-600 mt-1">Файл загружен: {formData.posterPath}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Название *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.releaseYear}
            onChange={e => setFormData({ ...formData, releaseYear: parseInt(e.target.value) || 2024 })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Жанр *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.genre}
            onChange={e => setFormData({ ...formData, genre: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Страна производства</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="США, Великобритания и т.д."
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Режиссёр *</label>
          <select
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block mb-1 font-medium">Длительность (минуты)</label>
          <input
            type="number"
            min="1"
            max="600"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.duration}
            onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Возрастной рейтинг</label>
          <select
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.rating}
            onChange={e => setFormData({ ...formData, rating: e.target.value })}
          >
            <option value="G">G — Нет ограничений</option>
            <option value="PG">PG — Рекомендуется присутствие родителей</option>
            <option value="PG-13">PG-13 — Детям до 13 лет с родителями</option>
            <option value="R">R — До 17 лет только с родителями</option>
            <option value="NC-17">NC-17 — Только с 18 лет</option>
            <option value="18+">18+ — Только для взрослых</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Бюджет</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$100 000 000"
            value={formData.budget}
            onChange={e => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Описание сюжета</label>
          <textarea
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите описание фильма..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBlockbuster}
              onChange={e => setFormData({ ...formData, isBlockbuster: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="font-medium">Блокбастер</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition"
        >
          {loading ? "Создание..." : "Создать фильм"}
        </button>
      </form>
    </div>
  );
}