import base64
import os

from django.contrib.auth.models import User
from django.db import models
from fernet import Fernet
from simplecrypt import encrypt, decrypt


class EncryptedText(models.TextField):

    description = "An encrypted text field for storing sensitive information"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, key, args, kwargs = super().deconstruct()
        return name, key, args, kwargs

    def from_db_value(self, value, expression, connection):
        __key_private = os.environ.get('PRIVATE_ENCRYPT_KEY', None)
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None:
            raise ValueError('No ENCRYPT_KEY environment variable found!')
        if __key_private and value:
            value = base64.b64decode(value)
            value = decrypt(__key_private, value)
            value = value.decode("utf-8")
        return value

    def to_python(self, value):
        return value

    def get_db_prep_value(self, value, connection, prepared=False):
        __key_private = os.environ.get('PRIVATE_ENCRYPT_KEY', None)
        __key_public = os.environ.get('PUBLIC_ENCRYPT_KEY', None)
        if __key_private is None:
            raise ValueError('No ENCRYPT_KEY environment variable found!')
        if value:
            if __key_private:
                value = encrypt(__key_private, value)
                value = base64.b64encode(value).decode('utf-8')
            if __key_public is not None:
                public_value = encrypt(__key_public, value)
                public_value = base64.b64encode(public_value).decode('utf-8')
                value += f'[split_keys]{public_value}'
        return value


# Create your models here.
class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class EncryptedUserData(models.Model):
    name = EncryptedText(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'User-{self.user} encrypted data'
