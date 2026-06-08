"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";

export default function CreateDirectorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    birthYear: 1970,
    country: "",
    isActive: true,
    photoPath: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/directors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/directors");
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
      <h1 className="text-2xl font-bold mb-6">Добавить режиссёра</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Фото режиссёра</label>
          <FileUpload onFileUploaded={(path) => setFormData({ ...formData, photoPath: path })} />
          {formData.photoPath && (
            <p className="text-sm text-green-600 mt-1">Файл загружен: {formData.photoPath}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1">ФИО *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Год рождения *</label>
          <input
            type="number"
            required
            min="1800"
            max="2026"
            className="w-full border rounded px-3 py-2"
            value={formData.birthYear}
            onChange={e => setFormData({ ...formData, birthYear: parseInt(e.target.value) })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Страна *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
            />
            Активен
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