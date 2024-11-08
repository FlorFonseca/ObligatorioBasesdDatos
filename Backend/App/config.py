# app/config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user:password@mysql/obligatorio"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
