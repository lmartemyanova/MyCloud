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

        user, created = User.objects.get_or_create(username=username, defaults={
            "email": email,
            "first_name": first_name,
            "last_name": last_name
        })

        if created:
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.is_admin = True 
            user.save()
            self.stdout.write(self.style.SUCCESS("Суперпользователь создан."))
        else:
            updated = False
            if not user.is_staff:
                user.is_staff = True
                updated = True
            if not user.is_superuser:
                user.is_superuser = True
                updated = True
            if not user.is_admin:
                user.is_admin = True
                updated = True
            if updated:
                user.save()
                self.stdout.write(self.style.SUCCESS("Существующему пользователю присвоены права администратора."))
            else:
                self.stdout.write(self.style.NOTICE("Суперпользователь уже существует и имеет все права."))