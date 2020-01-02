from django.db import router
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from spin.apps.authentication.views import EncryptedUserDataApiView, CreateClientAPIView

router = routers.DefaultRouter()

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('swap_keys', EncryptedUserDataApiView.as_view(), name='swap_keys'),
    path('client_create', CreateClientAPIView.as_view(), name='client_create'),
]
