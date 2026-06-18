## 🎬 Movie Catalog

> Каталог фильмов и режиссёров

---

## ⚙️ Хостинг

> Сайт размещен на бесплатном хостинге **Railway.app**и **Vercel** и доступен по ссылке:


🔗 **https://movie-catalog-production-95e1.up.railway.app/**
🔗 **https://movie-catalog-amber.vercel.app**
---

## 📖 О проекте

Веб-приложение для управления каталогом фильмов.  
Позволяет добавлять, редактировать и удалять **режиссёров** и **фильмы**, а также загружать постеры и фото режиссёров.

**Предметная область:** `Режиссёр` → `Фильм` (связь один-ко-многим)

---

## 🏗️ Архитектура

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
# Скачайте проект
git clone https://github.com/Dahipie/movie-catalog.git

# Перейдите в папку
cd movie-catalog

# Установите всё необходимое
npm install

# Запустите сервер
npm run dev
```

🌐 Откройте браузер и перейдите на **http://localhost:3000**

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

![Главная страница](https://github.com/user-attachments/assets/08428c2e-5ed2-4f02-9a2c-f6574f5bce82)

---

### Все режиссеры

![Список режиссёров](https://github.com/user-attachments/assets/be78e9d0-e4ce-450b-9db1-22ac5bf04729)

---

### Конкретный режиссер

![Конкретный режиссёр](https://github.com/user-attachments/assets/9d43f56e-d061-42b0-99e7-a6eeb4c0eff8)

---

### Все фильмы

![Список фильмов](https://github.com/user-attachments/assets/b903d519-f74f-4fa7-aa41-d1b5bc868ac5)

---

### Конкретный фильм

![Конкретный фильм](https://github.com/user-attachments/assets/8adea59d-0af5-451d-9b25-735319446c4b)

---

### Пример создания нового фильма

![Форма создания фильма](https://github.com/user-attachments/assets/2eac1b05-17d2-41c1-a902-f85064ba7d4b)

---

## 👤 Автор

**Войнов Степан Николаевич**  
Группа ИСП-9.19 | Специальность 09.02.07

---
