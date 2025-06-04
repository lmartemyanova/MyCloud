from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=100)
    is_admin = models.BooleanField(default=False)
    storage_path = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.username