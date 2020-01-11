import base64
import os

from django.db import models
from django.db.models import TextField
from simplecrypt import encrypt, decrypt
from spin.apps.storage.managers import encode, decode

from spin.settings import SECRET_KEY


class EncryptedText(models.TextField):
    description = "An encrypted text field for storing sensitive information"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, key, args, kwargs = super().deconstruct()
        return name, key, args, kwargs

    def from_db_value(self, value, expression, connection):
        __key_private = SECRET_KEY
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None and __key_public is None:
            raise ValueError('No PRIVATE_ENCRYPT_KEY or PUBLIC_ENCRYPT_KEY environment variable found!')
        if value:
            value_private = value.split('[split_keys]')[0]
            value_public = value.split('[split_keys]')[1] if len(value.split('[split_keys]')) > 1 else None
            if value_private and __key_private is not None:
                value, __decrypt_key = value_private, __key_private
            elif value_public and __key_public is not None:
                value, __decrypt_key = value_public, __key_public
            else:
                raise ValueError('Can\'t match decrypt key and value')
            value = decode(__decrypt_key, bytes(value, 'utf-8'))
        return value

    def to_python(self, value):
        return value

    def get_db_prep_value(self, value, connection, prepared=False):
        __key_private = SECRET_KEY
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None:
            raise ValueError('No PRIVATE_ENCRYPT_KEY environment variable found!')
        if value:
            default_value = value
            if __key_private:
                value = encode(__key_private, default_value).decode('utf-8')
            if __key_public is not None:
                public_value = encode(__key_public, default_value)
                public_value = base64.b64encode(public_value).decode('utf-8')
                value += f'[split_keys]{public_value}'
        return value


class EncryptedEmail(models.EmailField):
    description = "An encrypted text field for storing sensitive information"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, key, args, kwargs = super().deconstruct()
        return name, key, args, kwargs

    def from_db_value(self, value, expression, connection):
        __key_private = SECRET_KEY
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None and __key_public is None:
            raise ValueError('No PRIVATE_ENCRYPT_KEY or PUBLIC_ENCRYPT_KEY environment variable found!')
        if value:
            value_private = value.split('[split_keys]')[0]
            value_public = value.split('[split_keys]')[1] if len(value.split('[split_keys]')) > 1 else None
            if value_private and __key_private is not None:
                value, __decrypt_key = value_private, __key_private
            elif value_public and __key_public is not None:
                value, __decrypt_key = value_public, __key_public
            else:
                raise ValueError('Can\'t match decrypt key and value')
            value = decode(__decrypt_key, bytes(value, 'utf-8'))
        return value

    def to_python(self, value):
        return value

    def get_db_prep_value(self, value, connection, prepared=False):
        __key_private = SECRET_KEY
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None:
            raise ValueError('No PRIVATE_ENCRYPT_KEY environment variable found!')
        if value:
            default_value = value
            if __key_private:
                value = encode(__key_private, default_value).decode('utf-8')
            if __key_public is not None:
                public_value = encode(__key_public, default_value)
                public_value = base64.b64encode(public_value).decode('utf-8')
                value += f'[split_keys]{public_value}'
        return value


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class EncryptedUserData(models.Model):
    name = models.TextField(null=True)
    encrypted_data = TextField(null=True)
    client_hash = models.TextField()

    # def __str__(self):
    #     return f'User-{self.user} encrypted data'
