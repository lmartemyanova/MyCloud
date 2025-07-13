# ☁️ Облачное хранилище — My Cloud

Веб-приложение для хранения, загрузки и обмена файлами между пользователями.

Развернутое приложение: [вставить ссылку на reg.ru].

## 🚀 Возможности

- Регистрация и аутентификация пользователей
- Хранилище файлов с уникальными путями
- Комментарии и переименование файлов
- Удаление и скачивание
- Публичные ссылки на файлы
- Админ-панель для управления пользователями и файлами
- JWT и session-based авторизация
- Логирование событий сервера
- REST API на DRF

---

# 🛠 Локальный запуск приложения

## 1. 📦 Установка и настройка

### 1.1 Клонируем репозиторий:

```bash
git clone [ссылка на репозиторий]
cd [название_папки]
```

### 1.2 Переходим в папку `backend`, создаём и активируем виртуальное окружение:
```bash
cd backend
python -m venv env
source env/bin/activate  # или env\Scripts\activate на Windows
```

### 1.3 Устанавливаем зависимости:
```bash
pip install -r requirements.txt
```

### 1.4 В папке `backend/` создаём файл `.env` в соответствии с шаблоном:
```env
SECRET_KEY=django-insecure-...
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_cloud
DB_USER=user
DB_PASSWORD=password

ADMIN_USERNAME=admin
ADMIN_FIRSTNAME=Admin
ADMIN_LASTNAME=User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

MEDIA_ROOT=media
MEDIA_URL=/media/

BASE_STORAGE=storage
```

> 🧪 Пример: `local.env.example` можно использовать как шаблон

---

## 2. 🗃 Настройка базы данных PostgreSQL
💡 Если база ещё не создана — нужно сделать это вручную.

### 2.1 Запускаем PostgreSQL (если не запущен)
```bash
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

### 2.2 Проверяем статус:
```bash
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" status
```

### 2.3 Подключаемся к PostgreSQL:
```bash
psql -U postgres -h localhost -p 5432
```
Вводим пароль (например, pass1)

### 2.4 Создаём базу данных:
```sql
CREATE DATABASE db_cloud_test1;
```

#### Если база данных уже существует, запускаем PostgreSQL:
```bash
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start # Windows
pg_ctl -D /var/lib/postgresql/15/main start # Linux
```
> Путь может отличаться в зависимости от дистрибутива и версии PostgreSQL.
> Укажите правильный путь до вашей папки с данными PostgreSQL.

##### Или проще:
```bash
net start postgresql-x64-XX # (где XX - это версия PostgreSQL) Windows
sudo systemctl start postgresql # Linux (обычно подходит для Ubuntu/Debian)
```

## 3. 🚀 Запуск проекта
### 3.1 Применяем миграции и создаём суперпользователя:

```bash
python manage.py migrate
python manage.py createsuperadmin
```

### 3.2 Запускаем сервер:

```bash
python manage.py runserver
```

---

## 🔗 Интерфейсы

- `http://127.0.0.1:8000/admin/` — Django Admin
- `http://127.0.0.1:8000/api/` — API
- `http://127.0.0.1:8000/media/` — доступ к файлам (локально)

---

## 📁 Структура проекта

```
backend/
│
├── users/             # Управление пользователями
├── storage/           # Работа с файлами
├── backend/           # Настройки и конфигурации Django
├── media/             # Загрузка файлов пользователей
├── manage.py          # Точка входа
└── .env               # Конфиденциальные настройки
```

---

## 🧰 Технологии

- Python 3.11
- Django 4.2
- PostgreSQL
- Django REST Framework
- SimpleJWT
- django-environ
- UUID
- логирование через logging

---

## 🗂 API (основные)

### Аутентификация
- `POST /api/users/register/` — регистрация
- `POST /api/users/login/` — вход
- `POST /api/users/logout/` — выход
- `GET /api/users/me/` — текущий пользователь
- `POST /api/users/token/` — получить JWT токен
- `POST /api/users/token/refresh/` — обновление JWT токена

### Пользователи (admin only)
- `GET /api/users/users/` — список пользователей
- `DELETE /api/users/users/<id>/` — удаление пользователя
- `POST /api/users/users/<id>/toggle-admin/` — переключение прав администратора

### Файлы
- `POST /api/storage/upload/` — загрузить файл
- `GET /api/storage/my-files/` — список своих файлов
- `DELETE /api/storage/delete/<id>/` — удалить файл
- `PATCH /api/storage/rename/<id>/` — переименовать файл
- `PATCH /api/storage/comment/<id>/` — обновить комментарий
- `GET /api/storage/download/<uuid>/` — скачать файл
- `GET /api/storage/public/<uuid>/` — публичное скачивание
- `GET /api/storage/public/<uuid>/metadata/` — получить метаинформацию публичного файла
- `POST /api/storage/mark-downloaded/<id>/` — отметить файл как загруженный
- `GET /api/storage/user-files/?user_id=<id>` — получить файлы конкретного пользователя (для админки)

---

# 🖼️ Фронтенд (React)
## 🔧 Установка и запуск фронтенда

Перейдите в папку фронтенда:

```bash
cd frontend
```

Установите зависимости:

```bash
npm install
# или
yarn install
```

Создайте .env файл в папке frontend/:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Запустите фронтенд в режиме разработки:

```bash
npm run dev
# или
yarn dev
```

Интерфейс будет доступен по адресу:

```
http://localhost:5173
```

## 🛠 Технологии
- **JavaScript (ES6+)**
- **React 19.1.0** — библиотека для построения пользовательского интерфейса
- **Vite** — сборщик и dev-сервер
- **fetch API** — взаимодействие с backend API
- **React Router** — маршрутизация

## 🔑 Возможности интерфейса
- Регистрация и авторизация 
- Загрузка и удаление файлов
- Просмотр списка файлов
- Комментарии к файлам
- Скачивание файлов
- Генерация и скачивание по публичной ссылке
- Адаптивная верстка
- Интерфейс администратора:
    - Список пользователей
    - Удаление пользователей

> 👤 Админка становится доступной только пользователям с правами администратора после входа.

## 🧭 Навигация по интерфейсу
- `/` — Главная (или дашборд пользователя)
- `/login` — Страница входа
- `/register` — Регистрация
- `/admin` — Фронтенд-админка
- `/public/:uuid` — Просмотр файла по публичной ссылке
