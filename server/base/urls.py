from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path

from .views import get_notes, signup, get_current_user

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('notes/', get_notes),
    path('signup/', signup, name='signup'),
    path('current_user/', get_current_user, name='current_user'),
]
