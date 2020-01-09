import uuid

from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.response import Response

from spin.apps.authentication.managers import get_jwt_token
from spin.apps.authentication.models import BunchOfKeys, AnonymousUser
from spin.apps.storage.models import EncryptedUserData


class EncryptedUserDataSerializer(serializers.ModelSerializer):
    private_client_key = serializers.CharField(required=True)
    public_client_key = serializers.CharField(required=True)
    client_encoded_password = serializers.CharField(required=True)

    class Meta:
        model = EncryptedUserData
        fields = 'private_client_key', 'public_client_key', 'client_encoded_password'

    def create(self, validated_data):
        server_shared_pub_key = 'server_hash'

        keys = BunchOfKeys.objects.create(
            client_hash=self.context,
            private_client_key=validated_data.get('private_client_key'),
            public_client_key=validated_data.get('public_client_key'),
            shared_server_public_key='server_pub_key'  # todo put server public
        )
        keys.save()

        return Response(server_shared_pub_key)


class CreateClientSerializer(serializers.ModelSerializer):
    shared = serializers.BooleanField()
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = AnonymousUser
        fields = 'shared', 'email', 'password', 'name',

    def create(self, validated_data):
        client_hash = uuid.uuid4()
        user = AnonymousUser.objects.create(shared=validated_data.get('shared'),
                                     email=validated_data.get('email'),
                                     password=make_password(validated_data.get('password')),
                                     client_hash=client_hash,
                                     name=validated_data.get('name'),
                                     username=uuid.uuid4()
                                     )
        EncryptedUserData.objects.create(client_hash=client_hash)
        self.validated_data['jwt'] = get_jwt_token(user)
        return Response(validated_data)