from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Create superuser from environment variables'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = os.getenv("ADMIN_USERNAME")
        first_name = os.getenv("ADMIN_FIRSTNAME", "")
        last_name = os.getenv("ADMIN_LASTNAME", "")
        email = os.getenv("ADMIN_EMAIL")
        password = os.getenv("ADMIN_PASSWORD")

        if not username or not email or not password:
            self.stdout.write(self.style.WARNING("Не указаны все переменные для суперпользователя. Пропуск."))
            return

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                is_staff=True,
                is_superuser=True
            )
            self.stdout.write(self.style.SUCCESS("Суперпользователь создан."))
        else:
            self.stdout.write(self.style.NOTICE("Суперпользователь уже существует."))