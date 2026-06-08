"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Director, Movie, DirectorWithMovies } from "@/types";
import Link from "next/link";

export default function DirectorDetailPage() {
  const { id } = useParams();
  const [director, setDirector] = useState<DirectorWithMovies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/directors/${id}`)
      .then(res => res.json())
      .then(data => {
        setDirector(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Загрузка...</div>;
  if (!director) return <div className="text-center py-10 text-red-500">Режиссёр не найден</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{director.fullName}</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p><strong>Год рождения:</strong> {director.birthYear}</p>
        <p><strong>Страна