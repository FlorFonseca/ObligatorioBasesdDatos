import datetime
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from config import get_db_connection

app = Flask(__name__)
CORS(app)

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
@app.route('/instructores', methods=['GET', 'POST', 'PUT'])
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
    
    if request.method == 'PUT':
        try:
            data = request.get_json()
            ci = data.get('ci')
            nombre = data.get('nombre')
            apellido = data.get('apellido')

            cursor.execute("""
                UPDATE instructores 
                SET nombre = %s, apellido = %s
                WHERE ci = %s
            """, (nombre, apellido, ci))

            connection.commit()
            cursor.close()
            connection.close()

            return jsonify({"message": "Instructor actualizado"}), 200
        except Exception as e:
            cursor.close()
            connection.close()
            return jsonify({"message": "Error al actualizar el instructor", "error": str(e)}), 500
        
# Eliminar un instructor por ci
@app.route('/instructores/<string:ci>', methods=['DELETE'])
def delete_instructor(ci):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("DELETE FROM instructores WHERE ci = %s", (ci,))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Instructor eliminado"}), 200
    except Exception as e:
        return jsonify({"message": "Error al eliminar instructor", "error": str(e)}), 500
    
# Lista de actividades
@app.route('/actividades', methods=['GET'])
def get_activities():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM actividades")
    actividades = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(actividades)


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
@app.route('/alumnos', methods=['GET', 'POST', 'PUT'])
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
        try:
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
        except Exception as e:
            cursor.close()
            connection.close()
            return jsonify({"message": "Error al crear el alumno", "error": str(e)}), 500

    if request.method == 'PUT':
        try:
            data = request.get_json()
            print(data)
            ci = data.get('ci')
            nombre = data.get('nombre')
            apellido = data.get('apellido')
            fecha_nacimiento = data.get('fecha_nacimiento')
            num_contacto = data.get('num_contacto')
            email = data.get('email')

            cursor.execute("""
                UPDATE alumnos 
                SET nombre = %s, apellido = %s, fecha_nacimiento = %s, num_contacto = %s, email = %s
                WHERE ci = %s
            """, (nombre, apellido, fecha_nacimiento, num_contacto, email, ci))

            connection.commit()
            cursor.close()
            connection.close()

            return jsonify({"message": "Alumno actualizado"}), 200
        except Exception as e:
            cursor.close()
            connection.close()
            return jsonify({"message": "Error al actualizar el alumno", "error": str(e)}), 500


# Eliminar un alumno por ci
@app.route('/alumnos/<string:ci>', methods=['DELETE'])
def delete_student(ci):
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para eliminar al alumno con el ci especificado
        cursor.execute("DELETE FROM alumnos WHERE ci = %s", (ci,))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Alumno eliminado"}), 200
    except Exception as e:
        return jsonify({"message": "Error al eliminar alumno", "error": str(e)}), 500


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


# CRUD de clases
@app.route('/clase', methods=['POST'])#Crear una clase
def create_class():
    try:
        data = request.get_json()
        id_clase, ci_instructor, id_actividad, id_turno, tipo_clase, aforo = data['id'], data['ci_instructor'], data['id_actividad'], data['id_turno'], data['tipo_clase'], data['aforo']
        connection = get_db_connection()
        cursor = connection.cursor()

        # Validar que el instructor no tenga otra clase en el mismo turno
        cursor.execute("""
            SELECT COUNT(*) AS count
            FROM clase
            WHERE ci_instructor = %s AND id_turno = %s
        """, (ci_instructor, id_turno))
        conflict = cursor.fetchone()
        if conflict[0] > 0:
            return jsonify({"error": "El instructor ya tiene una clase asignada en este turno"}), 400

        # Insertar la clase
        cursor.execute("""
            INSERT INTO clase (id, ci_instructor, id_actividad, id_turno, dictada, tipo_clase, aforo)
            VALUES (%s, %s, %s, %s, false, %s, %s)
        """, (id_clase, ci_instructor, id_actividad, id_turno, tipo_clase, aforo))
        connection.commit()

        cursor.close()
        connection.close()
        return jsonify({"message": "Clase creada exitosamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/clase/<id>', methods=['PUT'])#Para modificar la clase
def update_class(id):
    try:
        data = request.get_json()
        ci_instructor = data.get('ci_instructor')
        id_turno = data.get('id_turno')
        aforo = data.get('aforo')

        connection = get_db_connection()
        cursor = connection.cursor()

        # Verificar si la clase existe y si no está en horario
        cursor.execute("""
            SELECT clase.id, turnos.hora_inicio, turnos.hora_fin
            FROM clase
            JOIN turnos ON clase.id_turno = turnos.id
            WHERE clase.id = %s
        """, (id,))
        clase = cursor.fetchone()
        if not clase:
            return jsonify({"error": "Clase no encontrada"}), 404

        hora_actual = datetime.datetime.now().time()
        if clase[1] <= hora_actual <= clase[2]:
            return jsonify({"error": "No se puede modificar una clase durante su horario"}), 400

        # Validar conflictos con el instructor
        if ci_instructor and id_turno:
            cursor.execute("""
                SELECT COUNT(*) AS count
                FROM clase
                WHERE ci_instructor = %s AND id_turno = %s AND id != %s
            """, (ci_instructor, id_turno, id))
            conflict = cursor.fetchone()
            if conflict[0] > 0:
                return jsonify({"error": "El instructor ya tiene otra clase asignada en este turno"}), 400

        # Actualizar la clase
        cursor.execute("""
            UPDATE clase
            SET ci_instructor = %s, id_turno = %s, aforo = %s
            WHERE id = %s
        """, (ci_instructor or clase[0], id_turno or clase[1], aforo, id))
        connection.commit()

        cursor.close()
        connection.close()
        return jsonify({"message": "Clase actualizada exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/clase/<id>', methods=['DELETE'])#Eliminar una clase
def delete_class(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Verificar si la clase existe y si no está en horario
        cursor.execute("""
            SELECT clase.id, turnos.hora_inicio, turnos.hora_fin
            FROM clase
            JOIN turnos ON clase.id_turno = turnos.id
            WHERE clase.id = %s
        """, (id,))
        clase = cursor.fetchone()
        if not clase:
            return jsonify({"error": "Clase no encontrada"}), 404

        hora_actual = datetime.datetime.now().time()
        if clase[1] <= hora_actual <= clase[2]:
            return jsonify({"error": "No se puede eliminar una clase durante su horario"}), 400

        # Eliminar la clase
        cursor.execute("DELETE FROM clase WHERE id = %s", (id,))
        connection.commit()

        cursor.close()
        connection.close()
        return jsonify({"message": "Clase eliminada exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clases', methods=['GET'])#Sirve para obtener la clase, como queremos mostrar el nombre de la actividad hacemos el join con actividades
def get_class():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT clase.id AS id_clase,
                   actividades.descripcion AS nombre_actividad,
                   CONCAT(instructores.nombre, ' ', instructores.apellido) AS nombre_instructor,
                    CONCAT(turnos.hora_inicio,' a ', turnos.hora_fin) AS turno,
                    clase.tipo_clase, clase.aforo, clase.dictada
            FROM clase
            JOIN actividades ON clase.id_actividad = actividades.id
            JOIN instructores ON clase.ci_instructor = instructores.ci
            JOIN turnos ON clase.id_turno = turnos.id
        """)
        #CONCAT combina el nombre y el apellido del instructor
        clases = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(clases), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
