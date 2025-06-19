from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'comment', 'size', 'uploaded_at', 'last_downloaded_at']
        read_only_fields = ['id', 'uploaded_at']

    def create(self, validated_data):
        file = validated_data.get("file")
        validated_data["size"] = validated_data.get("size") or file.size
        return super().create(validated_data)