from django.shortcuts import render

# Create your views here.
import os

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from .models import File
from .serializers import FileSerializer, FileMetadataSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from django.http import FileResponse
from django.utils.encoding import smart_str
from django.utils.timezone import now
from urllib.parse import quote


class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if not user.storage_path:
            # Пример: storage/username/
            user.storage_path = os.path.join('storage', user.username)
            user.save()
        serializer.save(owner=user)


class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return File.objects.filter(owner=self.request.user)


class FileDeleteView(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return File.objects.filter(owner=self.request.user)
    

class RenameFileView(generics.UpdateAPIView):
    queryset = File.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer

    def patch(self, request, pk):
        file = get_object_or_404(File, pk=pk)
        if file.owner != request.user and not request.user.is_admin:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        file.original_name = request.data.get('original_name', file.original_name)
        file.save()
        return Response({'original_name': file.original_name})


class UpdateCommentView(generics.UpdateAPIView):
    queryset = File.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer

    def patch(self, request, pk):
        file = get_object_or_404(File, pk=pk)
        if file.owner != request.user and not request.user.is_admin:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        file.comment = request.data.get('comment', file.comment)
        file.save()
        return Response({'comment': file.comment})
    

class DownloadFileView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uuid):
        file = get_object_or_404(File, unique_link=uuid)
        if file.owner != request.user and not request.user.is_admin:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        file.last_downloaded_at = now()
        file.save()
        response = FileResponse(file.file.open('rb'), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{smart_str(file.original_name)}"'
        return response
    

class PublicDownloadView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, uuid):
        file = get_object_or_404(File, unique_link=uuid)
        file.last_downloaded_at = now()
        file.save()

        original_name = file.original_name
        encoded_name = quote(original_name)

        response = FileResponse(file.file.open('rb'), as_attachment=True)
        response['Content-Disposition'] = (
            f'attachment; filename="{smart_str(original_name)}"; '
            f"filename*=UTF-8''{encoded_name}"
        )
        return response
    

class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id and self.request.user.is_admin:
            return File.objects.filter(owner_id=user_id)
        return File.objects.filter(owner=self.request.user)


class MarkDownloadedView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            file = File.objects.get(pk=pk)
            if file.owner != request.user and not request.user.is_admin:
                return Response({"detail": "Нет доступа."}, status=403)
            file.last_downloaded_at = now()
            file.save()
            return Response({"success": True})
        except File.DoesNotExist:
            return Response({"detail": "Файл не найден."}, status=404)
        

class UserFilesAdminAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response({"error": "user_id is required"}, status=400)

        files = File.objects.filter(owner_id=user_id)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def public_file_metadata(request, uuid):
    try:
        file = File.objects.get(unique_link=uuid)
    except File.DoesNotExist:
        return Response({"detail": "Файл не найден"}, status=status.HTTP_404_NOT_FOUND)

    serializer = FileMetadataSerializer(file)
    return Response(serializer.data)
