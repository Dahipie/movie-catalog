"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            🎬 Movie Catalog
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0`}>
            <Link href="/directors" className="block py-2 hover:text-gray-300">Режиссёры</Link>
            <Link href="/directors/new" className="block py-2 hover:text-gray-300">Добавить режиссёра</Link>
            <Link href="/movies" className="block py-2 hover:text-gray-300">Фильмы</Link>
            <Link href="/movies/new" className="block py-2 hover:text-gray-300">Добавить фильм</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}