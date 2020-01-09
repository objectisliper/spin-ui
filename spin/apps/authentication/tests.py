import json

from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase


class AuthenticationApiTest(APITestCase):
    client_jwt = None

    def setUp(self) -> None:
        pass

    def test_client_create(self):
        data = {'shared': False,
                'password': 'asdfASsF4F3RTFASGa2',
                'email': 'test_client_api@mailinator.com',
                'name': 'EVA'}

        response = self.client.post('/authentication/client_create', json.dumps(data),
                                    content_type='application/json', HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.client_jwt = json.loads(response.content)['jwt']
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(self.client_jwt)

    def test_client_obtain_jwt(self):
        # data = {'token': False,
        #         'password': 'asdfASsF4F3RTFASGa2',
        #         'email': 'test_client_api@mailinator.com',
        #         'name': 'EVA'}

        response = self.client.post('/authentication/swap_keys', {}, Authorization=f'Token {self.client_jwt}',
                                    content_type='application/json', HTTP_X_REQUESTED_WITH='XMLHttpRequest', )
        self.assertEqual(response.status_code, 200)