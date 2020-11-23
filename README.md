# StudHunter

StudHunter - сайт по размещению резюме для студентов ВУЗов. Проект реализован на Django со связкой SQLite. В проекте имеется Makefile, который упростит первоначальную установку сайта.


## Installation

Перед запуском вам необходимо установить все зависимости. При работе с ОС Linux, в Makefile необходимо заменить python на python3.

```console
git clone https://github.com/TimBerk/studhunter
cd studhunter
make install-packages
make start
make front
make all
```

## Built With

* [Django](https://www.djangoproject.com/) -  web framework written in Python.
* [Django environ’s](https://django-environ.readthedocs.io/en/latest/) - Django-environ allows to utilize 12factor inspired environment variables to configure Django application.
* [Django autoslug](https://django-autoslug.readthedocs.org/) - Django library that provides an improved slug field.
* [Django-cors-headers](https://github.com/adamchainz/django-cors-headers) - A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses.
* [Django-filter](https://django-filter.readthedocs.io/en/stable/) - Django-filter is a generic, reusable application to alleviate writing some of the more mundane bits of view code.
* [Django REST framework](https://www.django-rest-framework.org/) - Django REST framework is a toolkit for building Web APIs.
* [Django Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) - Simple JWT provides a JSON Web Token authentication backend.
* [Djoser](https://djoser.readthedocs.io/en/latest/getting_started.html) - REST implementation of Django authentication system.
* [drf-yasg](https://drf-yasg.readthedocs.io/en/stable/) - library generates OpenAPI 2.0 documents.
* [Pillow](https://pillow.readthedocs.io/en/stable/) - Python Imaging Library.

## Make команды

* **run** - запуск сервера разработки.
* **all** - запуск сервера разработки с React.
* **migrate** - синхронизация состояние базы данных с текущим состоянием моделей и миграций.
* **remove-migrations** - удаление всех файлов миграций.
* **superuser** - создание администратора.
* **shell** - запуск интерактивного интерпретатора.
* **start** - инициализация тестовых данных.
* **static-files** - инициализация статических файлов.
* **get-packages** - запись списка используемых пакетов в проекте.
* **install-packages** - установка необходимых пакетов для проекта.


## Features

### Admin backend

### Users

* Sign in;
* Sign up;
* Profile editing(personal data).

### Main

* Add several resume;
* View vacancies.


### API

* Authorization with JWT token;
* CRUD for resume.
* Auto generate OpenAPI 2.0 documents.

## Demo Users

```
administrator
Login: admin
Password: admin

user
Login: student
Password: 123456
```