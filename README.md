# courseProject2year
This is an monitoring and alarm system, created as my course project (university)

Commands that need to be run for flask to work properly
--------- Linux --------------

python3 -m venv vtest1

. vtest1/bin/activate

pip3 install Flask
pip3 install flask-marshmallow
pip3 install flask-sqlalchemy
pip3 install marshmallow
pip3 install marshmallow-sqlalchemy
pip3 install flask-cors
pip3 install PyMySQL

sudo apt-get install python3-pymysql

sudo apt install mysql-client-core-8.0?? ні

export FLASK_APP=main_rest.py
flask run

------------ Windows --------------
py -3 -m pip3 install virtualenv
py -3 -m venv vtest1
alarmvenv\Scripts\activate

-- vtest1\Scripts\activate

pip3 install Flask
pip3 install flask-marshmallow
pip3 install flask-sqlalchemy
pip3 install marshmallow
pip3 install marshmallow-sqlalchemy
pip3 install flask-cors
pip3 install PyMySQL
pip install cryptography(if not on the host os)

setx FLASK_APP "main_rest.py"
flask run


set FLASK_APP=main_rest.py
$env:FLASK_APP = "main_rest.py"
flask run
