from flask import Flask, jsonify, request, make_response
from config import get_db_connection

app = Flask(__name__)

# Login de usuario
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data['correo']
    password = data['password']

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM login WHERE correo = %s AND password = %s", (correo, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user:
        return jsonify({"message": "Login exitoso"}), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401

# CRUD de instructores
@app.route('/instructores', methods=['GET', 'POST'])
def manage_instructors():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM instructores")
        instructores = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(instructores)

    if request.method == 'POST':
        data = request.get_json()
        ci, nombre, apellido = data['ci'], data['nombre'], data['apellido']
        cursor.execute("INSERT INTO instructores (ci, nombre, apellido) VALUES (%s, %s, %s)", (ci, nombre, apellido))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Instructor creado"}), 201

# Modificación de actividades
@app.route('/actividades/<id>', methods=['PUT'])
def update_activity(id):
    data = request.get_json()
    descripcion = data.get('descripcion')
    costo = data.get('costo')
    restriccion_edad = data.get('restriccion_edad')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        UPDATE actividades 
        SET descripcion = %s, costo = %s, restriccion_edad = %s 
        WHERE id = %s
    """, (descripcion, costo, restriccion_edad, id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "Actividad actualizada"}), 200

# CRUD de alumnos
@app.route('/alumnos', methods=['GET', 'POST'])
def manage_students():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM alumnos")
        alumnos = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(alumnos)

    if request.method == 'POST':
        data = request.get_json()
        ci, nombre, apellido, fecha_nacimiento, num_contacto, email = (
            data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento'], data['num_contacto'], data['email']
        )
        cursor.execute("""
            INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, num_contacto, email) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (ci, nombre, apellido, fecha_nacimiento, num_contacto, email))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Alumno creado"}), 201

# Consultar reportes
@app.route('/reportes', methods=['GET'])
def generate_reports():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT actividades.descripcion, SUM(equipamiento.costo + actividades.costo) AS total_ingreso
        FROM actividades
        JOIN clase ON actividades.id = clase.id_actividad
        JOIN equipamiento ON equipamiento.id_actividad = actividades.id
        GROUP BY actividades.id
        ORDER BY total_ingreso DESC
    """)
    ingresos = cursor.fetchall()

    cursor.execute("""
        SELECT actividades.descripcion, COUNT(alumno_clase.ci_alumno) AS total_alumnos
        FROM actividades
        JOIN clase ON actividades.id = clase.id_actividad
        JOIN alumno_clase ON clase.id = alumno_clase.id_clase
        GROUP BY actividades.id
        ORDER BY total_alumnos DESC
    """)
    alumnos = cursor.fetchall()

    cursor.execute("""
        SELECT turnos.id, COUNT(clase.id) AS total_clases
        FROM turnos
        JOIN clase ON turnos.id = clase.id_turno
        GROUP BY turnos.id
        ORDER BY total_clases DESC
    """)
    turnos = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify({"ingresos": ingresos, "alumnos": alumnos, "turnos": turnos})

if __name__ == '__main__':
    app.run(debug=True)
