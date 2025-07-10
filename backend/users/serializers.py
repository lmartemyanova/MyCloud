from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Sum
from django.contrib.auth import get_user_model
from storage.models import File


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username', 
            'email', 
            'password', 
            'full_name', 
            'is_admin', 
            'storage_path'
        ]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            full_name=validated_data.get('full_name', ''),
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user is None:
            raise serializers.ValidationError("Неверные учетные данные")
        
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'full_name': user.full_name,
            'is_admin': user.is_admin,
        }


class UserSerializer(serializers.ModelSerializer):
    file_count = serializers.SerializerMethodField()
    storage_size = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id", 
            "username", 
            "full_name", 
            "email", 
            "is_admin", 
            "file_count", 
            "storage_size"
        ]

    def get_file_count(self, user):
        return File.objects.filter(owner=user).count()

    def get_storage_size(self, user):
        total = File.objects.filter(owner=user).aggregate(size=Sum("size"))["size"]
        return total or 0
