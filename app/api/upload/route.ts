import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    // Проверяем тип файла (только изображения)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Можно загружать только изображения (JPEG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    // Проверяем размер файла (максимум 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Файл слишком большой. Максимальный размер 5MB" },
        { status: 400 }
      );
    }

    // Создаём уникальное имя файла
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const originalName = file.name;
    const extension = originalName.split(".").pop();
    const fileName = `${timestamp}-${random}.${extension}`;
    
    // Путь для сохранения (папка public/uploads)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    
    // Создаём папку если её нет
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Сохраняем файл
    await writeFile(filePath, buffer);
    
    // Возвращаем путь к файлу
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      path: fileUrl,
      message: "Файл успешно загружен"
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}