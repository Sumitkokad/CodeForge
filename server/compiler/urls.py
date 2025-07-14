from django.urls import path
# from .views import test_api
from .views import run_code, ask_ai

urlpatterns = [
    # path('test/', test_api),
    path('run/', run_code),
    path('ask-ai/', ask_ai),  # Add this new path
]
