import { NextRequest, NextResponse } from "next/server";
import { getAllDirectors, paginate } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    
    const directors = getAllDirectors();
    const paginated = paginate(directors, page, limit);
    
    return NextResponse.json(paginated);
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { createDirector } = await import("@/lib/utils");
    const newDirector = createDirector(body);
    return NextResponse.json(newDirector, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  }
}