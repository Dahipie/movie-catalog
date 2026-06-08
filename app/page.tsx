import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center animate-fade-in">
      <div className="animate-scale-in">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          🎬 Каталог фильмов и режиссёров
        </h1>
      </div>
      
      <div className="animate-slide-left delay-200">
        <p className="text-xl text-gray-600 mb-8">
          Управляйте информацией о режиссёрах и их фильмах
        </p>
      </div>
      
      <div className="flex justify-center gap-4 animate-slide-right delay-300">
        <Link
          href="/directors"
          className="group bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <span className="text-xl">🎭 Режиссёры</span>
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/movies"
          className="group bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <span className="text-xl">🎬 Фильмы</span>
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}