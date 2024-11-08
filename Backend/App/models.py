# app/models.py
from . import db

class Alumno(db.Model):
    __tablename__ = 'alumnos'
    ci = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20), nullable=False)
    apellido = db.Column(db.String(20), nullable=False)
    fecha_nacimiento = db.Column(db.Date)
    num_contacto = db.Column(db.String(20))
    email = db.Column(db.String(50), nullable=False)

class Actividad(db.Model):
    __tablename__ = 'actividades'
    id = db.Column(db.String(50), primary_key=True)
    descripcion = db.Column(db.String(100))
    costo = db.Column(db.Integer)
    restriccion_edad = db.Column(db.Integer)
