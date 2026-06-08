import { NextRequest, NextResponse } from "next/server";
import { restoreMovie } from "@/lib/utils";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const restored = restoreMovie(id);
    if (!restored) {
      return NextResponse.json({ error: "Фильм не найден или не удалён" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Фильм восстановлен" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}