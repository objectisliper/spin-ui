import os

from django.contrib.auth.models import User
from django.db import models
from django.utils.baseconv import base64
from fernet import Fernet


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
            f = Fernet(self.__key)
            value = f.decrypt(value)
        return value

    def to_python(self, value):
        return value

    def get_db_prep_value(self, value, connection, prepared=False):
        self.__key = os.environ.get('ENCRYPT_KEY', None)
        if self.__key is None:
            raise ValueError('No ENCRYPT_KEY environment variable found!')
        if value:
            if self.__key:
                f = Fernet(self.__key)
                value = f.encrypt(value.encode())
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
