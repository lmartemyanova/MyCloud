from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    LogoutView, 
    UserProfileView, 
    UserListView, 
    UserDeleteView,
    ToggleAdminView
)
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    # Аутентификация и профиль
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', UserProfileView.as_view(), name='profile'),
    # JWT токены
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Администрирование пользователей
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:pk>/', UserDeleteView.as_view(), name='user_delete'),
    path('users/<int:pk>/toggle-admin/', ToggleAdminView.as_view(), name='toggle_admin'),
]