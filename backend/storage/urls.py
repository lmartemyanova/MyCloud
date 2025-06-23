from django.urls import path

from django.urls import path
from .views import (
    FileUploadView, FileListView, FileDeleteView,
    RenameFileView, UpdateCommentView, DownloadFileView,
    PublicDownloadView, MarkDownloadedView
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('my-files/', FileListView.as_view(), name='file-list'),
    path('delete/<int:pk>/', FileDeleteView.as_view(), name='file-delete'),
    path('rename/<int:pk>/', RenameFileView.as_view(), name='file-rename'),
    path('comment/<int:pk>/', UpdateCommentView.as_view(), name='file-comment'),
    path('download/<uuid:uuid>/', DownloadFileView.as_view(), name='file-download'),
    path('public/<uuid:uuid>/', PublicDownloadView.as_view(), name='file-public-download'),
    path('mark-downloaded/<int:pk>/', MarkDownloadedView.as_view(), name='mark-downloaded'),
]