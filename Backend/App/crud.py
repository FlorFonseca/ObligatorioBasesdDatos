# app/crud.py
from .models import Alumno, db

def create_alumno(data):
    alumno = Alumno(**data)
    db.session.add(alumno)
    db.session.commit()
    return alumno

def get_alumnos():
    return Alumno.query.all()
