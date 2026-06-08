import { NextRequest, NextResponse } from "next/server";
import { getMovieById, updateMovie, deleteMovie } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movie = getMovieById(id);
    if (!movie) {
      return NextResponse.json({ error: "Фильм не найден" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateMovie(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Фильм не найден" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteMovie(id);
    if (!deleted) {
      return NextResponse.json({ error: "Фильм не найден" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}