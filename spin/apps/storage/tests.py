import os

from autofixture import create, create_one
from django.contrib.auth.models import User
from django.test import TestCase

from spin.apps.storage.models import EncryptedUserData


class EncryptedUserDataModelTestCase(TestCase):

    user_name = 'Name for test user'
    encrypt_key = 'test123'

    def test_encryption(self):
        os.environ['ENCRYPT_KEY'] = self.encrypt_key
        created_user = create_one(User, commit=False)
        created_user.save()
        EncryptedUserData(name=self.user_name, user=created_user).save()

        self.assertEqual((EncryptedUserData.objects.first()).name, self.user_name)
