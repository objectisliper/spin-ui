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
        self.__key = os.environ.get('ENCRYPT_KEY', None)
        if self.__key is None:
            raise ValueError('No ENCRYPT_KEY environment variable found!')
        if self.__key and value:
            value = base64.b64decode(value)
            value = decrypt(self.__key, value)
            value = value.decode("utf-8")
        return value

    def to_python(self, value):
        return value

    def get_db_prep_value(self, value, connection, prepared=False):
        self.__key = os.environ.get('ENCRYPT_KEY', None)
        if self.__key is None:
            raise ValueError('No ENCRYPT_KEY environment variable found!')
        if value:
            if self.__key:
                value = encrypt(self.__key, value)
                value = base64.b64encode(value).decode('utf-8')
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
