import { NextRequest, NextResponse } from "next/server";
import { getDirectorById, updateDirector, deleteDirector, getMoviesByDirector } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const director = getDirectorById(id);
    if (!director) {
      return NextResponse.json({ error: "Режиссёр не найден" }, { status: 404 });
    }
    const movies = getMoviesByDirector(id);
    return NextResponse.json({ ...director, movies });
  } catch (error) {
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
    const deleted = deleteDirector(id);
    if (!deleted) {
      return NextResponse.json({ error: "Режиссёр не найден" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}