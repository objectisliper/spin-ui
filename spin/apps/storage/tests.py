import os

from autofixture import create, create_one
from spin.apps.authentication.models import AnonymousUser
from django.test import TestCase

from .models import EncryptedUserData


class EncryptedUserDataModelTestCase(TestCase):

    user_name = 'Name for test user'
    encrypt_private_key = 'test123'
    encrypt_public_key = 'test_public'

    def test_encryption_with_private_key(self):
        os.environ['PRIVATE_ENCRYPT_KEY'] = self.encrypt_private_key
        created_user = create_one(AnonymousUser, commit=False)
        created_user.save()
        EncryptedUserData(name=self.user_name).save()

        self.assertEqual((EncryptedUserData.objects.first()).name, self.user_name)

    def test_encryption_with_both_keys(self):
        os.environ['PRIVATE_ENCRYPT_KEY'] = self.encrypt_private_key
        os.environ['PUBLIC_ENCRYPT_KEY'] = self.encrypt_public_key
        created_user = create_one(AnonymousUser, commit=False)
        created_user.save()
        EncryptedUserData(name=self.user_name).save()

        self.assertEqual((EncryptedUserData.objects.first()).name, self.user_name)

    def test_raise_exception_on_encryption_with_only_public_key(self):
        os.environ['PUBLIC_ENCRYPT_KEY'] = self.encrypt_public_key
        os.environ.pop('PRIVATE_ENCRYPT_KEY')
        with self.assertRaises(ValueError):
            created_user = create_one(AnonymousUser, commit=False)
            created_user.save()

    def test_decryption_with_public_key(self):
        os.environ['PRIVATE_ENCRYPT_KEY'] = self.encrypt_private_key
        os.environ['PUBLIC_ENCRYPT_KEY'] = self.encrypt_public_key
        created_user = create_one(AnonymousUser, commit=False)
        created_user.save()
        EncryptedUserData(name=self.user_name).save()
        os.environ.pop('PRIVATE_ENCRYPT_KEY')

        self.assertEqual((EncryptedUserData.objects.first()).name, self.user_name)
