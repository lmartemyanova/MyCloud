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

### 1.2 Клонируем в неё репозиторий:
```bash
git clone [ссылка на репозиторий]
cd [название_папки]
```

### 1.3 Переходим в папку `backend`, создаём и активируем виртуальное окружение:
```bash
cd backend
python -m venv env
source env/bin/activate  # или env\Scripts\activate на Windows
```

### 1.4 Устанавливаем зависимости:
```bash
pip install -r requirements.txt
```

### 1.5 В папке `backend/` создаём файл `.env` в соответствии с шаблоном:
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
- `POST /api/users/register/`
- `POST /api/token/`
- `POST /api/token/refresh/`
- `POST /api/users/logout/`

### Пользователи (admin only)
- `GET /api/users/`
- `DELETE /api/users/delete/<id>/`

### Файлы
- `POST /api/storage/upload/`
- `GET /api/storage/files/`
- `DELETE /api/storage/delete/<id>/`
- `PATCH /api/storage/rename/<id>/`
- `PATCH /api/storage/comment/<id>/`
- `GET /api/storage/download/<uuid>/`
- `GET /api/storage/public/<uuid>/`

---
