# app/routes/alumnos.py
from flask import Blueprint, request, jsonify
from ..models import Alumno, db
from ..crud import create_alumno, get_alumnos

alumnos_bp = Blueprint("alumnos", __name__)

@alumnos_bp.route("/alumnos", methods=["POST"])
def crear_alumno():
    data = request.get_json()
    alumno = create_alumno(data)
    return jsonify({"message": "Alumno creado exitosamente", "alumno": alumno.id}), 201

@alumnos_bp.route("/alumnos", methods=["GET"])
def listar_alumnos():
    alumnos = get_alumnos()
    return jsonify([alumno.serialize() for alumno in alumnos])
