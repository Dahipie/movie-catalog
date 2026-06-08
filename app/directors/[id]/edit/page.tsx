"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Director } from "@/types";
import FileUpload from "@/components/FileUpload";

export default function EditDirectorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    birthYear: 1970,
    country: "",
    isActive: true,
    photoPath: "",
  });

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const res = await fetch(`/api/directors/${id}`);
        if (!res.ok) throw new Error("Режиссёр не найден");
        const data = await res.json();
        setFormData({
          fullName: data.fullName || "",
          birthYear: data.birthYear || 1970,
          country: data.country || "",
          isActive: data.isActive || false,
          photoPath: data.photoPath || "",
        });
      } catch (err) {
        setError("Ошибка загрузки режиссёра");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchDirector();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/directors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push(`/directors/${id}`);
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка при сохранении");
      }
    } catch {
      setError("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Редактировать режиссёра</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Фото режиссёра</label>
          <FileUpload onFileUploaded={(path) => setFormData({ ...formData, photoPath: path })} />
          {formData.photoPath && (
            <p className="text-sm text-green-600 mt-1">Файл загружен: {formData.photoPath}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1 font-medium">ФИО *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Год рождения *</label>
          <input
            type="number"
            required
            min="1800"
            max="2026"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.birthYear}
            onChange={e => setFormData({ ...formData, birthYear: parseInt(e.target.value) || 1970 })}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Страна *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
          />
        </div>
        
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="font-medium">Активен</span>
          </label>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}