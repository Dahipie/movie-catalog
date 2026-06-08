import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        🎬 Каталог фильмов и режиссёров
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Управляйте информацией о режиссёрах и их фильмах
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/directors"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Режиссёры →
        </Link>
        <Link
          href="/movies"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Фильмы →
        </Link>
      </div>
    </div>
  );
}