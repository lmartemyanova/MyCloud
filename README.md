# Облачное хранилище My Cloud
Развернутое приложение [вставить ссылку на reg.ru].

# Локальный запуск приложения
1. Создаём на локальном компьютере директорию для проекта

2. Клонируем в неё репозиторий:
```
git clone [ссылка на репозиторий]
```
3. Открываем папку diplom в любой IDE и запускаем встроенный терминал

4. Переходим в папку backend:
```
cd backend
```
5. Создаём виртуальное окружение:
```
python -m venv env
```
6. Активируем его:
```
env/Scripts/activate
```
7. Устанавливаем зависимости:
```
pip install -r requirements.txt
```
8. В папке backend создаём файл .env в соответствии с шаблоном:
```
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=(list)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_cloud
DB_USER=user
DB_PASSWORD=password
ADMIN_USERNAME=
ADMIN_FIRSTNAME=
ADMIN_LASTNAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
BASE_STORAGE=
```