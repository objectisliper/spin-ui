from split_settings.tools import include
from .apps import *
include('apps.py',
        'local_settings.py',
        'celeryconf.py',
        'restconf.py',
        'logger.py',
        'auth.py',
        'common.py',
        'credentials.py',
        )