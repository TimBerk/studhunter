run:
	python manage.py runserver
all:
	python manage.py runserver & cd frontend && npm start
migrate:
	python manage.py makemigrations
	python manage.py migrate
superuser:
	python manage.py createsuperuser
shell:
	python manage.py shell
sql-shell:
	python manage.py debugsqlshell
static:
	python manage.py collectstatic
start:
	python manage.py makemigrations
	python manage.py migrate
	python manage.py create-admin --noinput --username admin --password admin --email admin@uni.ru
	python manage.py loaddata user/fixtures/user.json
	python manage.py loaddata resume/fixtures/dictionaries.xml
	python manage.py loaddata firm/fixtures/data.json
get-packages:
	pip freeze > requirements.txt
install-packages:
	pip install -r requirements.txt
get-fixtures:
	python manage.py dumpdata auth.user user --indent 4 --format json > user/fixtures/user.json
	python manage.py dumpdata resume --indent 4 --format xml > resume/fixtures/dictionaries.xml
	python manage.py dumpdata firm --indent 4 --format json > firm/fixtures/data.json
front:
	cd ./frontend && npm i && npm run build
run-front:
	cd ./frontend && npm run dev