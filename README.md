# 🎬 Movie Catalog

> Каталог фильмов и режиссёров

---

## 📌 О проекте

Веб-приложение для управления каталогом фильмов.  
Позволяет добавлять, редактировать и удалять **режиссёров** и **фильмы**, а также загружать постеры и фото режиссёров.

**Предметная область:** `Режиссёр` → `Фильм` (связь один-ко-многим)

---

## 🧠 Архитектура

**Вариант Б — Fullstack Next.js**

- Фронтенд + бэкенд в одном проекте
- API через Route Handlers (`app/api/`)
- Хранилище: in-memory + JSON-файл

✅ Нет проблем с CORS  
✅ Простой запуск  
✅ Легко расширяется

---

## 🛠 Технологии

| Назначение | Технология |
|------------|------------|
| ⚛️ Фреймворк | Next.js 16+ (App Router) |
| 📘 Язык | TypeScript |
| 🎨 Стили | Tailwind CSS |
| 🔌 API | Next.js Route Handlers |
| 💾 Хранилище | In-memory + JSON |
| 🌐 Запросы | Fetch API |

---

## 🚀 Запуск

```bash
git clone https://github.com/Dahipie/movie-catalog.git
cd movie-catalog
npm install
npm run dev
```

Открой **http://localhost:3000**

---

## 📁 Сущности

| Сущность | Поля |
|----------|------|
| **Director** (Режиссёр) | `id`, `fullName`, `birthYear`, `country`, `isActive`, `photoPath`, `createdAt`, `updatedAt` |
| **Movie** (Фильм) | `id`, `title`, `releaseYear`, `genre`, `directorId`, `posterPath`, `description`, `duration`, `budget`, `boxOffice`, `rating`, `country`, `tagline`, `isBlockbuster`, `createdAt`, `description` |

**Связи:** `Director` → `Movie` →(один-ко-многим)

---

## 📡 API

### Режиссёры

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/directors?page=1&limit=5` | Список режиссёров (пагинация) |
| GET | `/api/directors/:id` | Один режиссёр + его фильмы |
| POST | `/api/directors` | 	Создать режиссёра |
| PATCH | `/api/directors/:id` | Обновить режиссёра |
| DELETE | `/api/directors/:id` | 	Удалить режиссёра |

### Фильмы

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/movies?page=1&search=&directorId=` | Список фильмов (пагинация, поиск, фильтр) |
| GET | `/api/movies/:id` | Один фильм |
| POST | `/api/movies` | Создать фильм |
| PATCH | `/api/movies/:id` | 	Обновить фильм |
| DELETE | `/api/movies/:id` | Удалить фильм |

### Загрузка файлов

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/api/upload` | Загрузка постеров (image/*) и фото (image/*) |

---

## 📸 Скриншоты

### Главная страница

![Главная страница](https://github.com/user-attachments/assets/08428c2e-5ed2-4f02-9a2c-f6574f5bce82")

---

### Все режиссеры

![Все исполнители](https://github.com/user-attachments/assets/eae6bd3b-2002-41e7-ba12-0980ab17c702)

---

### Конкретный режиссер

![Конкретный исполнитель](https://github.com/user-attachments/assets/2a2a97a1-5622-4148-b95a-07f6fac6c277)

---

### Все фильмы

![Все альбомы](https://github.com/user-attachments/assets/7f4a5cbe-532c-4987-96db-a48d32ee63c2)

---

### Конкретный фильм

![Конкретный альбом](https://github.com/user-attachments/assets/108462ec-6fc0-4301-8436-f56877f53125)

---

### Пример создания нового фильма

![Форма создания альбома](https://github.com/user-attachments/assets/c06b0474-1b03-43ce-9020-1cad58ca5795)

---

## 👤 Автор

**Войнов Степан Николаевич**  
Группа ИСП-9.19 | Специальность 09.02.07

---
