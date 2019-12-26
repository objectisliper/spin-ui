from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models
from autofixture import create, create_one
# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver

from spin.apps.authentication.utils import generator_hash


class BunchOfKeys(models.Model):
    private_client_key = models.TextField(null=True)
    public_client_key = models.TextField(null=True)
    shared_server_public_key = models.TextField(default="TODO Reciever")


class AnonymousUser(AbstractUser):
    client_hash = models.CharField(max_length=128, default=generator_hash(), unique=True)
    keys_swapped = models.BooleanField(default=False)
    shared = models.BooleanField(default=False)
    email = models.CharField(max_length=100, default='spin-project@info.com')

    USERNAME_FIELD = 'client_hash'

    def __str__(self):
        return self.client_hash

