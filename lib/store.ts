import { Director, Movie } from "@/types";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data.json");

// Загрузка данных из JSON
function loadData(): { directors: Director[]; movies: Movie[] } {
  if (!fs.existsSync(dataPath)) {
    return { directors: [], movies: [] };
  }
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

// Сохранение в JSON
function saveData(directors: Director[], movies: Movie[]) {
  fs.writeFileSync(dataPath, JSON.stringify({ directors, movies }, null, 2));
}

// Инициализация тестовыми данными
function initSeedData() {
  const { directors, movies } = loadData();
  if (directors.length > 0 && movies.length > 0) return;

  const crypto = require("crypto");
  const uuid = () => crypto.randomUUID();
  const now = new Date().toISOString();

  const seedDirectors: Director[] = [
    { id: uuid(), fullName: "Кристофер Нолан", birthYear: 1970, country: "Великобритания", isActive: true, createdAt: now, updatedAt: now },
    { id: uuid(), fullName: "Квентин Тарантино", birthYear: 1963, country: "США", isActive: true, createdAt: now, updatedAt: now },
    { id: uuid(), fullName: "Грета Гервиг", birthYear: 1983, country: "США", isActive: true, createdAt: now, updatedAt: now },
    { id: uuid(), fullName: "Акира Куросава", birthYear: 1910, country: "Япония", isActive: false, createdAt: now, updatedAt: now },
    { id: uuid(), fullName: "Дени Вильнёв", birthYear: 1967, country: "Канада", isActive: true, createdAt: now, updatedAt: now },
  ];

  const seedMovies: Movie[] = [
    { id: uuid(), title: "Интерстеллар", releaseYear: 2014, genre: "Фантастика", directorId: seedDirectors[0].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Начало", releaseYear: 2010, genre: "Фантастика", directorId: seedDirectors[0].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Криминальное чтиво", releaseYear: 1994, genre: "Криминал", directorId: seedDirectors[1].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Убить Билла", releaseYear: 2003, genre: "Боевик", directorId: seedDirectors[1].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Леди Бёрд", releaseYear: 2017, genre: "Драма", directorId: seedDirectors[2].id, posterPath: "", isBlockbuster: false, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Маленькие женщины", releaseYear: 2019, genre: "Драма", directorId: seedDirectors[2].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Семь самураев", releaseYear: 1954, genre: "Боевик", directorId: seedDirectors[3].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Дюна", releaseYear: 2021, genre: "Фантастика", directorId: seedDirectors[4].id, posterPath: "", isBlockbuster: true, createdAt: now, updatedAt: now },
    { id: uuid(), title: "Бегущий по лезвию 2049", releaseYear: 2017, genre: "Фантастика", directorId: seedDirectors[4].id, posterPath: "", isBlockbuster: false, createdAt: now, updatedAt: now },
  ];

  saveData(seedDirectors, seedMovies);
}

// Экспорт данных
let cachedDirectors: Director[] = [];
let cachedMovies: Movie[] = [];

export function getDirectors(): Director[] {
  const data = loadData();
  cachedDirectors = data.directors;
  return cachedDirectors;
}

export function getMovies(): Movie[] {
  const data = loadData();
  cachedMovies = data.movies;
  return cachedMovies;
}

export function setDirectors(directors: Director[]) {
  cachedDirectors = directors;
  saveData(cachedDirectors, cachedMovies);
}

export function setMovies(movies: Movie[]) {
  cachedMovies = movies;
  saveData(cachedDirectors, cachedMovies);
}

// Инициализация
initSeedData();
getDirectors();
getMovies();