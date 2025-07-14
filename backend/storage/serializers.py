from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [
            'id', 
            'file', 
            'original_name', 
            'comment', 
            'size', 
            'uploaded_at', 
            'last_downloaded_at',
            'unique_link'
        ]
        read_only_fields = ['id', 'uploaded_at']

    def create(self, validated_data):
        file = validated_data.get("file")
        if not file:
            raise serializers.ValidationError({"file": "Файл обязателен."})

        validated_data["original_name"] = validated_data.get("original_name") or file.name
        validated_data["size"] = validated_data.get("size") or file.size
        return super().create(validated_data)
    

class FileMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [
            'original_name', 
            'comment', 
            'size', 
            'uploaded_at', 
            'last_downloaded_at',
            'unique_link',
        ]