import { Director, Movie } from "@/types";
import { getDirectors, getMovies, setDirectors, setMovies } from "./store";
import { randomUUID } from "crypto";

export function getNow() {
  return new Date().toISOString();
}

// ============ Directors CRUD ============

export function getAllDirectors(): Director[] {
  return getDirectors();
}

export function getDirectorById(id: string): Director | undefined {
  return getDirectors().find(d => d.id === id);
}

export function getMoviesByDirector(directorId: string): Movie[] {
  return getMovies().filter(m => m.directorId === directorId);
}

export function createDirector(data: any): Director {
  const newDirector: Director = {
    id: randomUUID(),
    fullName: data.fullName,
    birthYear: data.birthYear,
    country: data.country,
    isActive: data.isActive,
    createdAt: getNow(),
    updatedAt: getNow(),
  };
  const directors = [...getDirectors(), newDirector];
  setDirectors(directors);
  return newDirector;
}

export function updateDirector(id: string, data: any): Director | null {
  const directors = getDirectors();
  const index = directors.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  const updated = { ...directors[index], ...data, updatedAt: getNow() };
  directors[index] = updated;
  setDirectors(directors);
  return updated;
}

export function deleteDirector(id: string): boolean {
  console.log("deleteDirector вызван с ID:", id);
  
  // Получаем текущие данные
  let directors = getAllDirectors();
  let movies = getAllMovies();
  
  console.log("До удаления - режиссёров:", directors.length, "фильмов:", movies.length);
  
  // Проверяем, существует ли режиссёр
  const directorExists = directors.some(d => d.id === id);
  if (!directorExists) {
    console.log("Режиссёр не найден");
    return false;
  }
  
  // Удаляем режиссёра
  const newDirectors = directors.filter(d => d.id !== id);
  
  // Удаляем все фильмы этого режиссёра
  const newMovies = movies.filter(m => m.directorId !== id);
  
  // Сохраняем изменения
  setDirectors(newDirectors);
  setMovies(newMovies);
  
  console.log("После удаления - режиссёров:", newDirectors.length, "фильмов:", newMovies.length);
  
  return true;
}

// ============ Movies CRUD ============

// getAllMovies показывает только не удалённые фильмы
export function getAllMovies(): Movie[] {
  return getMovies();
}

// Получить все фильмы (включая удалённые) — для администратора
export function getAllMoviesIncludingDeleted(): Movie[] {
  return getMovies();
}

export function getMovieById(id: string): Movie | undefined {
  const movie = getMovies().find(m => m.id === id);
  return movie;
}

export function createMovie(data: any): Movie {
  const newMovie: Movie = {
    id: randomUUID(),
    title: data.title,
    releaseYear: data.releaseYear,
    genre: data.genre,
    directorId: data.directorId,
    posterPath: data.posterPath || "",
    isBlockbuster: data.isBlockbuster,
    createdAt: getNow(),
    updatedAt: getNow(),
  };
  const movies = [...getMovies(), newMovie];
  setMovies(movies);
  return newMovie;
}

export function updateMovie(id: string, data: any): Movie | null {
  const movies = getMovies();
  const index = movies.findIndex(m => m.id === id);
  if (index === -1) return null;
  
  const updated = { ...movies[index], ...data, updatedAt: getNow() };
  movies[index] = updated;
  setMovies(movies);
  return updated;
}

// Мягкое удаление
export function deleteMovie(id: string): boolean {
  const movies = getMovies();
  const filteredMovies = movies.filter(m => m.id !== id);
  
  if (filteredMovies.length === movies.length) {
    return false; // фильм не найден
  }
  
  setMovies(filteredMovies);
  return true;
}

// Восстановление удалённого фильма
export function restoreMovie(id: string): boolean {
  const movies = getMovies();
  const index = movies.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  // Просто обновляем дату или возвращаем true
  movies[index] = { ...movies[index], updatedAt: getNow() };
  setMovies(movies);
  return true;
}

// ============ Пагинация ============

export function paginate<T>(items: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    items: items.slice(start, end),
    total: items.length,
    page,
    pages: Math.ceil(items.length / limit),
  };
}

// ============ Поиск и фильтрация ============

export function searchMovies(query: string): Movie[] {
  if (!query) return getAllMovies();
  const lowerQuery = query.toLowerCase();
  return getAllMovies().filter(m => m.title.toLowerCase().includes(lowerQuery));
}

export function filterMoviesByDirector(movies: Movie[], directorId: string): Movie[] {
  if (!directorId) return movies;
  return movies.filter(m => m.directorId === directorId);
}