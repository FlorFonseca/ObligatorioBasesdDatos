# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    ma.init_app(app)
    
    from .routes.alumnos import alumnos_bp
    app.register_blueprint(alumnos_bp, url_prefix="/api")
    
    # Agregar otros Blueprints (actividades, instructores, clases)
    return app
