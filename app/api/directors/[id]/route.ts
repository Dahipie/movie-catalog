import { NextRequest, NextResponse } from "next/server";
import { getDirectorById, updateDirector, deleteDirector, getMoviesByDirector } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("API: запрос режиссёра с ID:", id);
    
    const director = getDirectorById(id);
    if (!director) {
      console.log("API: режиссёр не найден");
      return NextResponse.json({ error: "Режиссёр не найден" }, { status: 404 });
    }
    
    // Загружаем фильмы этого режиссёра
    const movies = getMoviesByDirector(id);
    console.log("API: найдено фильмов:", movies.length);
    
    // Возвращаем режиссёра с его фильмами
    const result = { ...director, movies };
    console.log("API: возвращаем результат");
    return NextResponse.json(result);
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
    const updated = updateDirector(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Режиссёр не найден" }, { status: 404 });
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
    console.log("Удаляем режиссёра с ID:", id);
    
    const deleted = deleteDirector(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Режиссёр не найден" }, { status: 404 });
    }
    
    console.log("Режиссёр удалён успешно");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}