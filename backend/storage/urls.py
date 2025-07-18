from django.urls import path

from django.urls import path
from . import views
from .views import (
    FileUploadView, 
    FileListView, 
    FilePreviewView,
    FileDeleteView,
    RenameFileView, 
    UpdateCommentView, 
    DownloadFileView,
    PublicDownloadView, 
    PublicPreviewView,
    MarkDownloadedView, 
    UserFilesAdminAPIView
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('my-files/', FileListView.as_view(), name='file-list'),
    path('delete/<int:pk>/', FileDeleteView.as_view(), name='file-delete'),
    path('rename/<int:pk>/', RenameFileView.as_view(), name='file-rename'),
    path('comment/<int:pk>/', UpdateCommentView.as_view(), name='file-comment'),
    path('preview/<uuid:uuid>/', FilePreviewView.as_view(), name='file-preview'),
    path('download/<uuid:uuid>/', DownloadFileView.as_view(), name='file-download'),
    path('public/<uuid:uuid>/', PublicDownloadView.as_view(), name='file-public-download'),
    path('mark-downloaded/<int:pk>/', MarkDownloadedView.as_view(), name='mark-downloaded'),
    path('public/<uuid:uuid>/metadata/', views.public_file_metadata, name='public_file_metadata'),
    path('public-preview/<uuid:uuid>/', PublicPreviewView.as_view(), name='file-public-preview'),
    path("user-files/", UserFilesAdminAPIView.as_view(), name="user-files-admin"),
]