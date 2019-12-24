# project_spin
## Base set up

At core directory of project, use provided commands:

```
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
```

Duplicate .env.example file and rename it to .env at project core directory,
debug mode, and database settings to your own or to production server settings

```
cp spin/.env.example spin/.env
```

If you don't have installed mysql at your system, use this commands

```
sudo apt-get update

sudo apt-get install mysql-server
```

And the final stage:

```
python manage.py migrate
```

## To start local server

```
python manage.py runserver 0:8000
```

## Set Up on ubuntu VPS
- According to previous steps, install and set up system
- Install additional needed packages

```
sudo apt install nginx
pip install gunicorn
``` 
- Check is nginx work, going on server ip or to 127.0.0.1 on local machine

- Accord to this guide https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04#creating-systemd-socket-and-service-files-for-gunicorn

- Don't forget to collect static

```
python3 manage.py collectstatic
```

## Nativescript
Before building, replace content of spin-ui/platforms/android/gradle/wrapper/gradle-wrapper.properties with:
```
#Mon Aug 26 10:52:45 EEST 2019
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-6.0.1-all.zip
```
