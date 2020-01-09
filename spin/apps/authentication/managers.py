import jwt
from rest_framework_jwt.utils import jwt_payload_handler

from spin.settings import SECRET_KEY


def get_jwt_token(user):
    payload = jwt_payload_handler(user)
    payload['name'] = user.name
    token = jwt.encode(payload, SECRET_KEY)
    return token.decode('unicode_escape')