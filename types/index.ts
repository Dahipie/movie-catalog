export interface Director {
  id: string;
  fullName: string;
  birthYear: number;
  country: string;
  isActive: boolean;
  isDeleted?: boolean;  // ← Добавьте
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  directorId: string;
  posterPath?: string;
  isBlockbuster: boolean;
  isDeleted?: boolean;  // ← Добавьте
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface ErrorResponse {
  error: string;
}

export interface DirectorWithMovies extends Director {
  movies: Movie[];
}