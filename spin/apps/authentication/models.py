from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
from spin.apps.storage.models import EncryptedText, EncryptedEmail


class BunchOfKeys(models.Model):
    private_client_key = models.TextField(null=True)
    public_client_key = models.TextField(null=True)
    shared_server_public_key = models.TextField(default="TODO Reciever")


class AnonymousUser(AbstractUser):
    client_hash = models.CharField(max_length=128, unique=True)
    keys_swapped = models.BooleanField(default=False)
    shared = models.BooleanField(default=False)
    # username = None
    name = models.CharField(max_length=128, unique=False)
    email = EncryptedEmail(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.client_hash

