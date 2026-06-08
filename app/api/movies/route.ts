import { NextRequest, NextResponse } from "next/server";
import { getAllMovies, paginate, searchMovies, filterMoviesByDirector } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const directorId = url.searchParams.get("directorId") || "";
    
    let movies = getAllMovies();
    
    if (search) {
      movies = searchMovies(search);
    }
    
    if (directorId) {
      movies = filterMoviesByDirector(movies, directorId);
    }
    
    const paginated = paginate(movies, page, limit);
    return NextResponse.json(paginated);
  } catch (error) {
    console.error("API /api/movies error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { createMovie } = await import("@/lib/utils");
    const newMovie = createMovie(body);
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  }
}