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
VITE_FRONTEND_URL=http://localhost:5173
# обратить внимание - данное содержимое .env только для локальной разработки - в продакшене будут другие переменные!
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

---

# 🚀 Развёртывание Django-проекта на облачном сервере

### Инструкция по развертыванию проекта MyCloud на облачном сервере Reg.ru.

## 1. Создание сервера

Зарегистрируйтесь на [reg.ru](https://www.reg.ru/).

Перейдите в личный кабинет → вкладка Рег.облако → Создать сервер.

**Выбор параметров:**

- Образ: Ubuntu
- Тариф и конфигурация: по требованиям проекта
- Регион размещения: любой
- Настройки сети:
- Плавающий (публичный) адрес — оставить
- Резервное копирование — опционально
- SSH-ключ:
    - Если ключа нет — создаем:
    - ```ssh-keygen``` (далее просто нажимаем Enter — ключи появятся в ```~/.ssh/id_rsa``` и ```~/.ssh/id_rsa.pub)```.
    - Найдите в терминале строчку ```Your public key has been saved in /c/Users/user/.ssh/id_rsa.pub```. Здесь важен путь, по которому сохранился ключ. Скопируйте окончание пути, начиная с ```/.ssh/```. 
    - Открываем ```.ssh/id_rsa.pub```, копируем его содержимое.
    - Ключ будет в ```C:\Users\User\.ssh\id_rsa.pub``` (Windows) или ```~/.ssh/id_rsa.pub``` (Linux/macOS)
    - Либо можно скопировать публичный ключ в терминале: ```cat ~/.ssh/id_rsa.pub```

После создания получим на почту:

- IP-адрес сервера
- Root-доступ

## 2. Подключение к серверу

### 2.1 Войти под root

```bash
ssh root@your_server_ip
```

### 2.2 Создать нового пользователя

```bash
adduser your_username
usermod -aG sudo your_username
logout
```

### 2.3 Войти под новым пользователем

```bash
ssh your_username@your_server_ip
```

## 3. Подготовка окружения

### 3.1 Обновление и установка зависимостей

```bash
sudo apt update
sudo apt upgrade
sudo apt install python3-venv python3-pip postgresql
```

### 3.2 Клонировать проект

```bash
git clone https://github.com/your_username/MyCloud.git  # (если свой репозиторий)
или
git clone https://github.com/lmartemyanova/MyCloud.git
cd MyCloud/backend
```

### 3.3 Создать и активировать виртуальное окружение

```bash
python3 -m venv env
source env/bin/activate
```

### 3.4 Установка зависимостей

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Если не устанавливается psycopg2-binary:

```bash
sudo apt install -y libpq-dev build-essential python3-dev
```

## 4. Настройка .env

Создать файл .env в корне backend/:

```bash
nano .env
```

Пример:

```env
SECRET_KEY=django-insecure-...

DEBUG=False
ALLOWED_HOSTS=your_domain_or_ip,127.0.0.1,localhost

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

ADMIN_USERNAME=admin
ADMIN_FIRSTNAME=Admin
ADMIN_LASTNAME=User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

MEDIA_ROOT=media
MEDIA_URL=/media/

BASE_STORAGE=storage
```

## 5. Создание базы данных

### 5.1 Войти под postgres

```bash
sudo su postgres
psql
```

### 5.2 Создать пользователя и БД

```sql
CREATE USER your_db_user WITH SUPERUSER;
ALTER USER your_db_user WITH PASSWORD 'your_db_password';
CREATE DATABASE your_db_name OWNER your_db_user;
\q
```

```bash
exit
```

## 6. Миграции и суперпользователь

### 6.1 Выполнить миграции

```bash
cd backend
source env/bin/activate
python manage.py migrate
```

Суперпользователь создаётся автоматически, если переменные указаны в .env.

## 7. Настройка Gunicorn + Nginx

### 7.1 Установка и проверка

```
bash
pip install gunicorn
gunicorn --version
sudo apt install nginx
```

### 7.2 Gunicorn systemd unit

Создаём сервис:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

```ini
[Unit]
Description=Gunicorn for Django project
After=network.target

[Service]
User=your_username
Group=www-data
WorkingDirectory=/home/your_username/your_project/backend
ExecStart=/home/your_username/your_project/backend/env/bin/gunicorn \
    --access-logfile - --workers=3 \
    --bind unix:/home/your_username/your_project/backend/backend/project.sock \
    backend.wsgi:application

[Install]
WantedBy=multi-user.target
```

Активировать сервис:

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn
```

### 7.3 Настройка Nginx

Создать конфиг:

```bash
sudo nano /etc/nginx/sites-available/your_project
```

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location /static/ {
        alias /home/your_username/your_project/backend/static/;
    }

    location /media/ {
        alias /home/your_username/your_project/backend/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/your_username/your_project/backend/backend/project.sock;
    }
}
```

## Символическая ссылка и перезапуск:

```bash
sudo ln -s /etc/nginx/sites-available/your_project /etc/nginx/sites-enabled
sudo systemctl restart nginx
sudo systemctl status nginx
```

Разрешить фаервол:

```bash
sudo ufw allow 'Nginx Full'
```

Если ошибка 502 (Permission denied), дать права:

```bash
sudo chmod o+x /home
sudo chmod o+x /home/your_username
sudo chmod o+x /home/your_username/your_project
sudo chmod o+x /home/your_username/your_project/backend
sudo chmod o+x /home/your_username/your_project/backend/backend
```

Перезапуск:

```bash
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

# 📦 Развёртывание фронтенда (Vite + React) на сервере

## 1. 📁 Структура проекта

Проект содержит подкаталог frontend, где расположен Vite-проект с React:

```bash
MyCloud/
├── backend/        # Django backend
├── frontend/       # Vite + React frontend
└── README.md
```

## 2. 🚧 Сборка фронтенда (локально или на сервере)

### 📌 Локально:

Собрать на своей машине и перенести готовую сборку:

```bash
cd frontend
npm install
npm run build
После этого появится папка dist/, содержащая production-сборку. Эту папку можно передать на сервер в любую подходящую директорию, например:
```

```bash
scp -r dist your_username@your_server_ip:/home/your_username/MyCloud/frontend_dist
```

### 📌 Или собрать прямо на сервере:

Переходим в папку фронтенда:

```bash
cd /home/your_username/MyCloud/frontend
```

Создаем .env файл с переменными окружения:

```bash
nano .env
```

Содержимое .env:

```env
VITE_API_URL=/api
VITE_FRONTEND_URL=https://your-domain.com  # или IP с http
```

Запускаем сборку:

```bash
npm install
npm run build
# будет создана папка /home/your_username/MyCloud/frontend/dist
```

## 3. ⚙ Настройка Nginx для фронтенда

Откроем конфиг:

```bash
sudo nano /etc/nginx/sites-available/mycloud
```

Добавим новый location для отдачи фронтенда:

```nginx
server {
    listen 80;
    server_name YOUR.SERVER.IP;

    location /static/ {
        alias /home/your_username/MyCloud/backend/static/;
    }

    location /media/ {
        alias /home/your_username/MyCloud/backend/media/;
    }

    # 👇 frontend
    location / {
        root /home/your_username/MyCloud/frontend/dist;
        index index.html;
        try_files $uri /index.html;
    }

    # 👇 backend API
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/home/your_username/MyCloud/backend/backend/project.sock;
    }
}
```

> Обратить внимание:

> - root указывает на dist, не должен заканчиваться на /
> - try_files $uri /index.html; — важно для работы React Router

## 4. 🔄 Перезапуск Nginx

```bash
sudo nginx -t        # проверить конфиг
sudo systemctl restart nginx
```

## 5. ✅ Проверка

Переходим в браузере на IP-адрес сервера:

- React-приложение отрисуется на /
- Запросы к API идут по /api/...
