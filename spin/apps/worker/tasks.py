import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
from spin import settings
from spin.apps.worker import logger

app = Celery('worker')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: app.INSTALLED_APPS)


@app.task(bind=True, name='celery')
def debug_task(self):
    logger.info('Request: {0!r}'.format(self.request))