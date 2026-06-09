import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center animate-fade-in px-4">
      <div className="animate-scale-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
          🎬 Каталог фильмов и режиссёров
        </h1>
      </div>
      
      <div className="animate-slide-left delay-200">
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl">
          Управляйте информацией о режиссёрах и их фильмах
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-right delay-300">
        <Link
          href="/directors"
          className="group bg-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
        >
          <span className="text-lg md:text-xl">🎭 Режиссёры</span>
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/movies"
          className="group bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
        >
          <span className="text-lg md:text-xl">🎬 Фильмы</span>
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}