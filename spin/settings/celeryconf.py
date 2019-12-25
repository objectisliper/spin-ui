import os
from kombu import Queue, Exchange
from celery import Celery

from spin.settings.apps import INSTALLED_APPS

CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_ENABLE_UTC = True
CELERY_CREATE_MISSING_QUEUES = True
BROKER_URL = os.getenv('BROKER_URL', 'amqp://guest:guest@localhost:5672/')
CELERY_RESULT_BACKEND = 'rpc'
CELERY_QUEUES = (Queue('celery', Exchange('direct'), routing_key='tasks.#'))

CELERY_ROUTES = {
    'spin.apps.worker.*': { 'queue': 'celery'
    },
}