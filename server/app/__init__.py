from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt import JWT

appx = Flask(__name__)
appx.config.from_object(Config)
appx.debug = True
db = SQLAlchemy(appx)
migrate = Migrate(appx, db)
from app.auth import authenticate, identity
jwt = JWT(appx, authenticate, identity)

from app import routes, models
