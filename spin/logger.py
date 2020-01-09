LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '[%(asctime)s] - %(levelname)s: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
        'simple_ms': {
            'format': '[%(asctime)s] - %(levelname)s: %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple_ms'
        },
        'authentication': {
            'level': 'INFO',
            'formatter': 'simple_ms',
            'class': 'logging.FileHandler',
            'filename': 'logs/authentication.log',
        },
        'storage': {
            'level': 'ERROR',
            'formatter': 'simple_ms',
            'class': 'logging.FileHandler',
            'filename': 'logs/storage.log',
        },
        'worker': {
            'level': 'INFO',
            'formatter': 'simple_ms',
            'class': 'logging.FileHandler',
            'filename': 'logs/worker.log',
        },
    },
    'loggers': {
        'authentication': {
            'handlers': ['authentication', 'console'],
            'level': 'INFO',
        },
        'storage': {
            'handlers': ['storage', 'console'],
            'level': 'ERROR',
        },
        'worker': {
            'handlers': ['worker', 'console'],
            'level': 'INFO',
        },

    }
}
