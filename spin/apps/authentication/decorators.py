import hmac
from base64 import b64encode
from hashlib import sha256
from django.conf import settings
from django.http import JsonResponse

from spin.settings import SECRET_KEY
from spin.settings import IS_LOCAL


class APISigning(object):

    def __init__(self, get_response):
        """
    1. Read a signature from header.
    2. Construct the message. In the example, it consists of
       * Secret Key
       * Request Method (PUT, GET, POST, ..)
       * URL Endpoint.
       * Request Body.
    those parameters are concatenated and separated by - symbol.
    3. Hash it with SHA256 using the Secret Key.
        """
        self.get_response = get_response

    def __call__(self, request):
        if IS_LOCAL:return self.get_response(request)
        if not self.is_valid(request):
            return JsonResponse(status_code=401)
        return self.get_response(request)

    def is_valid(self, request):
        """Validate signed requests."""
        api_signature = request.headers.get('HTTP_SIGNATURE')
        secret = settings.SECRET_KEY
        params = [
            secret, request.method,
            request.path, str(request.body)
        ]
        data = "-".join(params)
        data = data.encode('utf-8')
        computed_sig = hmac.new(
            secret.encode('utf-8'),
            msg=data, digestmod=sha256
        ).digest()
        signature = b64encode(computed_sig).decode()
        print(signature == api_signature)
        return signature == api_signature




