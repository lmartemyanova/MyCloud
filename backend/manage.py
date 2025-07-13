"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.core.management import execute_from_command_line


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    try:
        execute_from_command_line(['manage.py', 'migrate'])
        execute_from_command_line(['manage.py', 'createsuperadmin'])
    except Exception as e:
        print(f"Автозапуск команд завершился с ошибкой: {e}")

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
