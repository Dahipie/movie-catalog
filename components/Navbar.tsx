"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Закрываем меню при клике на ссылку
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl md:text-2xl font-bold hover:text-gray-300 transition">
            🎬 Movie Catalog
          </Link>
          
          {/* Десктопное меню */}
          <div className="hidden md:flex space-x-6">
            <Link href="/directors" className="hover:text-gray-300 transition">Режиссёры</Link>
            <Link href="/directors/new" className="hover:text-gray-300 transition">Добавить режиссёра</Link>
            <Link href="/movies" className="hover:text-gray-300 transition">Фильмы</Link>
            <Link href="/movies/new" className="hover:text-gray-300 transition">Добавить фильм</Link>
          </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-700 transition"
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное выпадающее меню */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-3 pb-4">
            <Link 
              href="/directors" 
              onClick={handleLinkClick}
              className="px-2 py-2 hover:bg-gray-700 rounded transition"
            >
              Режиссёры
            </Link>
            <Link 
              href="/directors/new" 
              onClick={handleLinkClick}
              className="px-2 py-2 hover:bg-gray-700 rounded transition"
            >
              Добавить режиссёра
            </Link>
            <Link 
              href="/movies" 
              onClick={handleLinkClick}
              className="px-2 py-2 hover:bg-gray-700 rounded transition"
            >
              Фильмы
            </Link>
            <Link 
              href="/movies/new" 
              onClick={handleLinkClick}
              className="px-2 py-2 hover:bg-gray-700 rounded transition"
            >
              Добавить фильм
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}