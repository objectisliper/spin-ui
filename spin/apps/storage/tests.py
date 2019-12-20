from autofixture import create, create_one
from django.contrib.auth.models import User
from django.test import TestCase

from spin.apps.storage.models import EncryptedUserData


class EncryptedUserDataModelTestCase(TestCase):

    user_name = 'Name for test user'

    def test_encryption(self):
        created_user = create_one(User)
        EncryptedUserData(name=self.user_name, user=created_user).save()

        EncryptedUserData.objects.first()

        self.assertFalse(False)