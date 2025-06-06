from django.shortcuts import render

# Create your views here.
import os

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from .models import File
from .serializers import FileSerializer
from django.shortcuts import get_object_or_404

from django.http import FileResponse
from django.utils.encoding import smart_str

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
        file.last_downloaded_at = timezone.now()
        file.save()
        response = FileResponse(file.file.open('rb'), as_attachment=True, filename=smart_str(file.original_name))
        return response
    
class PublicDownloadView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, uuid):
        file = get_object_or_404(File, unique_link=uuid)
        file.last_downloaded_at = timezone.now()
        file.save()
        response = FileResponse(file.file.open('rb'), as_attachment=True, filename=smart_str(file.original_name))
        return response
    
class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id and self.request.user.is_admin:
            return File.objects.filter(owner_id=user_id)
        return File.objects.filter(owner=self.request.user)
