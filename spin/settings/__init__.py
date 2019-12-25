from split_settings.tools import include

include('local_settings.py',
        'celeryconf.py',
        'restconf.py',
        'logger.py',
        'apps.py',
        'auth.py',
        'common.py',
        'credentials.py',
        )