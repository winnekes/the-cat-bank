import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgres://postgres:secret@localhost:5434/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False