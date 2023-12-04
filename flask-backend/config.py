import datetime
import os
baseDir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'medicine-store'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:@localhost/medicine_store'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "Jwt-key123"
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=24)
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

class MedicineionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': MedicineionConfig,
    'default': DevelopmentConfig
}