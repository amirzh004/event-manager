# Event Manager

Приложение для управления мероприятиями: создание, редактирование, удаление, фильтрация, сортировка, поиск и работа с избранным.

## Стек

- **Next.js 14+** (App Router, Server + Client Components)
- **TypeScript**
- **CSS Modules** — дизайн через CSS-переменные
- **react-hook-form + Zod** — управление формами и валидация
- **date-fns** — работа с датами
- **lucide-react** — иконки
- **Geist** (через `next/font`) — типографика
- **localStorage** — персистентность (изолирована за интерфейсом `EventsRepository`)

## Запуск

Требуется Node.js 18.17+ и Yarn (или npm).

````bash
yarn install
yarn dev          # http://localhost:3000
````

При первом запуске localStorage инициализируется демо-данными из `src/store/repository/mockData.ts`.

## Структура проекта

Применён упрощённый Feature-Sliced подход. Зависимости направлены сверху вниз: `app → widgets → features → entities → shared`. Нижние слои не знают о верхних.

````
src/
├── app/                 # Next.js App Router (страницы — Server Components)
│   ├── layout.tsx       # Root layout с навигацией и провайдерами
│   ├── page.tsx         # Главная — все мероприятия
│   ├── favorites/       # /favorites — избранные
│   ├── providers.tsx    # Клиентские провайдеры (события, тосты)
│   └── globals.css      # Дизайн (CSS-переменные)
│
├── entities/
│   └── event/           # Сущность Event
│       ├── model/       # Типы, Zod-схема, константы
│       └── ui/          # EventCard
│
├── features/            # Пользовательские фичи
│   ├── event-form/      # Форма создания/редактирования
│   ├── event-filters/   # Фильтрация, сортировка, поиск
│   ├── event-delete/    # Диалог подтверждения удаления
│   ├── event-favorite/  # Избранное
│   ├── event-export/    # Экспорт в JSON
│   └── event-pagination/# Пагинация
│
├── widgets/             # Композиции фич
│   ├── EventManager/    # Главный widget со списком и модалками
│   ├── Hero/            # Hero-секция с заголовком и статистикой
│   └── AppNav/          # Навигация (активная ссылка)
│
├── shared/
│   ├── ui/              # UI-компоненты (Button, Input, Select, Textarea, Modal, Toast)
│   ├── lib/             # Утилиты (даты, генерация id)
│   └── config/          # Константы (ключи storage, размер страницы)
│
└── store/
    ├── events/          # Глобальное состояние (Context + useReducer)
    │   ├── EventsContext.tsx
    │   ├── eventsReducer.ts
    │   ├── eventsActions.ts
    │   └── useEvents.ts # Публичный API хранилища
    └── repository/
        ├── EventsRepository.ts        # Интерфейс
        ├── LocalStorageRepository.ts  # Реализация
        └── mockData.ts                # Стартовые данные
````

## Архитектурные решения

### Состояние: useReducer + Context

Глобальное состояние событий построено на `useReducer` с типизированными actions. Reducer чистый: переходы состояний детерминированы, тестируемы, не содержат сайд-эффектов. Загрузка/сохранение в localStorage изолированы в `EventsProvider` через `useEffect` — состояние и хранилище разделены.

### Repository pattern для данных

UI работает не с `localStorage` напрямую, а с интерфейсом `EventsRepository`. Текущая реализация — `LocalStorageRepository`.

### Server vs Client Components

- `app/layout.tsx`, `app/page.tsx`, `app/favorites/page.tsx` — Server Components
- `widgets/EventManager` и всё ниже по дереву — Client Components, поскольку нуждаются в состоянии и интерактиве
- `widgets/AppNav` — отдельный Client component внутри Server-layout (для определения активной ссылки через `usePathname`)

## Реализованные функции

### Основные

- Просмотр мероприятий в виде сетки карточек
- Создание мероприятия через модальное окно с валидацией
- Редактирование (та же форма с прокинутыми initial-данными)
- Удаление с подтверждением через диалог
- Фильтрация по категории и статусу
- Сортировка по дате (↑/↓) и названию (А→Я / Я→А)
- Валидация: обязательное название, обязательная дата, дата не в прошлом для запланированных событий

### Опциональные (все реализованы)

- Поиск по названию и описанию
- Избранное и отдельная вкладка `/favorites`
- Экспорт списка мероприятий в JSON-файл
- Пагинация с компактным отображением страниц (`1 … 4 5 6 … 20`)