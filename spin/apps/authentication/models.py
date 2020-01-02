from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class BunchOfKeys(models.Model):
    private_client_key = models.TextField(null=True)
    public_client_key = models.TextField(null=True)
    shared_server_public_key = models.TextField(default="TODO Reciever")


class AnonymousUser(AbstractUser):
    client_hash = models.CharField(max_length=128, unique=True)
    keys_swapped = models.BooleanField(default=False)
    shared = models.BooleanField(default=False)
    email = models.CharField(max_length=100, default='spin-project@info.com')

    def __str__(self):
        return self.client_hash

