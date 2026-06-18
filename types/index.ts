export interface Director {
  id: string;
  fullName: string;
  birthYear: number;
  country: string;
  isActive: boolean;
  photoPath?: string;
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
  description?: string;
  duration?: number;
  budget?: string;
  rating?: string;
  м?: string;
  isBlockbuster: boolean;
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