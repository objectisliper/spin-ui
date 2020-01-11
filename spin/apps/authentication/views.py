from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.views import ObtainJSONWebToken

from spin.apps.authentication.managers import get_jwt_token
from spin.apps.authentication.serializers import EncryptedUserDataSerializer, CreateClientSerializer
from spin.apps.storage.models import EncryptedUserData


class EncryptedUserDataApiView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EncryptedUserDataSerializer

    def post(self, request, *args, **kwargs):
        user_hash = EncryptedUserData.objects.get(user=request.user).hash
        serializer = self.serializer_class(data=request.data,
                                           context=user_hash)
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.data)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CreateClientAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = CreateClientSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=False)
        serializer.create(serializer.data)
        return Response({'jwt': serializer.validated_data['jwt']}, status=status.HTTP_200_OK)


class LoginAPIView(ObtainJSONWebToken):

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            response_data = get_jwt_token(user=user)
            response = Response({'token': response_data})

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
