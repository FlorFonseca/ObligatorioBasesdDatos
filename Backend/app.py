import datetime
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from config import get_db_connection
from datetime import timedelta

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
    
# CRUD de turnos
@app.route('/turnos', methods=['GET', 'POST', 'PUT'])
def manage_turns():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM turnos")
        turnos = cursor.fetchall()
        for turno in turnos:
            if 'hora_inicio' in turno and isinstance(turno['hora_inicio'], timedelta):
                turno['hora_inicio'] = str(turno['hora_inicio'])  # Convertir a string
            if 'hora_fin' in turno and isinstance(turno['hora_fin'], timedelta):
                turno['hora_fin'] = str(turno['hora_fin'])  # Convertir a string
        cursor.close()
        connection.close()
        return jsonify(turnos)

    if request.method == 'POST':
        data = request.get_json()
        id, hora_inicio, hora_fin = data['id'], data['hora_inicio'], data['hora_fin']
        cursor.execute("INSERT INTO turnos (id, hora_inicio, hora_fin) VALUES (%s, %s, %s)", (id, hora_inicio, hora_fin))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Turno creado"}), 201
    
    if request.method == 'PUT':
        try:
            data = request.get_json()
            id = data.get('id')
            hora_inicio = data.get('hora_inicio')
            hora_fin = data.get('hora_fin')

            cursor.execute("""
                UPDATE turnos 
                SET hora_inicio = %s, hora_fin = %s
                WHERE id = %s
            """, (hora_inicio, hora_fin, id))

            connection.commit()
            cursor.close()
            connection.close()

            return jsonify({"message": "Turno actualizado"}), 200
        except Exception as e:
            cursor.close()
            connection.close()
            return jsonify({"message": "Error al actualizar el turno", "error": str(e)}), 500
        
# Eliminar un instuctor por id
@app.route('/turnos/<string:id>', methods=['DELETE'])
def delete_turno(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("DELETE FROM turnos WHERE id = %s", (id,))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Turno eliminado"}), 200
    except Exception as e:
        return jsonify({"message": "Error al eliminar turno", "error": str(e)}), 500
    
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

# GET de equipamientos
@app.route('/equipamiento', methods=['GET'])
def get_equipment():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM equipamiento")
    equipamiento = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(equipamiento)


# CRUD de clases
@app.route('/clase', methods=['POST'])
def create_class():
    try:
        data = request.get_json()
        print("Datos recibidos:", data)  # Log de los datos recibidos
        id_clase = data['id']
        ci_instructor = int(data['ci_instructor'])
        id_actividad = data['id_actividad']
        id_turno = data['id_turno']
        dictada = data['dictada']
        tipo_clase = data['tipo_clase']
        aforo = int(data['aforo'])

        if not isinstance(dictada, bool):
            dictada = dictada.lower() == "true"

        connection = get_db_connection()
        cursor = connection.cursor()

        # Verificar que el ci_instructor exista en la tabla instructores
        cursor.execute("SELECT COUNT(*) FROM instructores WHERE ci = %s", (ci_instructor,))
        instructor_exists = cursor.fetchone()[0]

        if instructor_exists == 0:
            return jsonify({"error": "El instructor con el CI proporcionado no existe"}), 400


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
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (id_clase, ci_instructor, id_actividad, id_turno,dictada, tipo_clase, aforo))
        connection.commit()

        

        cursor.close()
        connection.close()
        return jsonify({"message": "Clase creada exitosamente"}), 201

    except Exception as e:
        print("Error al crear la clase:", str(e))  # Imprime el error en la consola del servidor
        return jsonify({"error": "Error interno del servidor: " + str(e)}), 500



@app.route('/clase/<id>', methods=['PUT'])#Para modificar la clase
def update_class(id):
    try:
        data = request.get_json()
        ci_instructor = data.get('ci_instructor')
        id_turno = data.get('id_turno')
        aforo = data.get('aforo')
        dictada = data.get('dictada')
        tipo_clase = data.get('tipo_clase')

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
        hora_inicio = clase[1]
        hora_fin = clase[2]
        if isinstance(hora_inicio, datetime.timedelta): #Esta parte sirve para convertir los datos a datetime, sino da un error al editar
            hora_inicio = (datetime.datetime.min + hora_inicio).time()
        if isinstance(hora_fin, datetime.timedelta):
            hora_fin = (datetime.datetime.min + hora_fin).time()
        if hora_inicio <= hora_actual <= hora_fin:
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
            SET ci_instructor = %s, id_turno = %s, aforo = %s, dictada = %s, tipo_clase = %s
            WHERE id = %s
        """, (ci_instructor or clase[0], id_turno or clase[1], aforo, dictada, tipo_clase, id))
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
        hora_inicio = clase[1]
        hora_fin = clase[2]
        if isinstance(hora_inicio, datetime.timedelta): #Esta parte sirve para convertir los datos a datetime, sino da un error al editar
            hora_inicio = (datetime.datetime.min + hora_inicio).time()
        if isinstance(hora_fin, datetime.timedelta):
            hora_fin = (datetime.datetime.min + hora_fin).time()
        if hora_inicio <= hora_actual <= hora_fin:
            return jsonify({"error": "No se puede modificar una clase durante su horario"}), 400

        # Eliminar la clase
        cursor.execute("DELETE FROM clase WHERE id = %s", (id,))
        connection.commit()

        cursor.close()
        connection.close()
        return jsonify({"message": "Clase eliminada exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# obtener alumnos disponibles para una clase
@app.route('/clase/<id_clase>/alumnos_disponibles', methods=['GET'])
def obtener_alumnos_disponibles(id_clase):
    try:
        # Conexión a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Consulta para obtener únicamente los alumnos que no están inscritos en la clase
        cursor.execute("""
            SELECT al.ci, al.nombre, al.apellido
            FROM alumnos al
            WHERE al.ci NOT IN (
                SELECT ac.ci_alumno
                FROM alumno_clase ac
                WHERE ac.id_clase = %s
            )
        """, (id_clase,))
        alumnos_disponibles = cursor.fetchall()

        cursor.close()
        connection.close()

        # Devolver solo la lista de alumnos disponibles
        return jsonify(alumnos_disponibles), 200
    except Exception as e:
        print(f"Error al obtener alumnos disponibles: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/clase/<id_clase>/alumno', methods=['POST'])
def agregar_alumno_a_clase(id_clase):
    try:
        # Obtener los datos enviados
        data = request.get_json()
        alumno_ci = data.get('ci')  # Cambia según cómo recibas el CI del alumno
        equipamiento = data.get('equipamiento', [])

        if not alumno_ci:
            return jsonify({"error": "Alumno no seleccionado"}), 400

        # Conexión a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Verificar si el alumno ya está inscrito en la clase
        cursor.execute("""
            SELECT 1
            FROM alumno_clase
            WHERE id_clase = %s AND ci_alumno = %s
        """, (id_clase, alumno_ci))
        ya_inscrito = cursor.fetchone()

        if ya_inscrito:
            return jsonify({"error": "El alumno ya está inscrito en esta clase"}), 400

        # Verificar y asignar equipamiento si no se proporciona
        if not equipamiento:
            cursor.execute("""
                SELECT equipamiento.id AS id_equipamiento
                FROM actividad_equipamiento
                JOIN equipamiento ON actividad_equipamiento.id_equipamiento = equipamiento.id
                WHERE actividad_equipamiento.id_actividad = (
                    SELECT id_actividad FROM clase WHERE id = %s
                )
            """, (id_clase,))
            equipamiento = [equip['id_equipamiento'] for equip in cursor.fetchall()]

        # Validar que exista al menos un equipamiento
        if not equipamiento:
            return jsonify({"error": "No se pudo asignar equipamiento. Verifique las relaciones en la base de datos."}), 500

        # Insertar el alumno y el equipamiento
        for equip in equipamiento:
            cursor.execute("""
                INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento)
                VALUES (%s, %s, %s)
            """, (id_clase, alumno_ci, equip))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Alumno agregado exitosamente"}), 200
    except Exception as e:
        print(f"Error al agregar alumno a la clase: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/clases', methods=['GET'])#Sirve para obtener la clase, como queremos mostrar el nombre de la actividad hacemos el join con actividades
def get_class():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
        SELECT 
            c.id AS id_clase,
            a.descripcion AS nombre_actividad,
            CONCAT(i.nombre, ' ', i.apellido) AS nombre_instructor,
            CONCAT(t.hora_inicio, ' a ', t.hora_fin) AS turno,
            i.ci AS ci_instructor,
            a.id AS id_actividad,
            t.id AS id_turno,
            c.tipo_clase, 
            c.aforo, 
            c.dictada,
            a.costo AS costo_actividad,
            IFNULL(SUM(e.costo), 0) AS costo_equipamiento,
            GROUP_CONCAT(DISTINCT CONCAT(al.nombre, ' ', al.apellido) SEPARATOR ', ') AS alumnos_inscritos
        FROM 
            obligatorio.clase c
        JOIN 
            obligatorio.actividades a ON c.id_actividad = a.id
        JOIN 
            obligatorio.instructores i ON c.ci_instructor = i.ci
        JOIN 
            obligatorio.turnos t ON c.id_turno = t.id
        LEFT JOIN 
            obligatorio.alumno_clase ac ON c.id = ac.id_clase
        LEFT JOIN 
            obligatorio.alumnos al ON ac.ci_alumno = al.ci
        LEFT JOIN 
            obligatorio.equipamiento e ON ac.id_equipamiento = e.id
        GROUP BY 
            c.id, a.descripcion, i.nombre, i.apellido, t.hora_inicio, t.hora_fin, c.tipo_clase, c.aforo, c.dictada, a.costo;
        """)
        #CONCAT combina el nombre y el apellido del instructor
        clases = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(clases), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/clase/<id>', methods=['GET'])#Para obtener la información de una clase por el id
def get_class_by_id(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
        SELECT 
            c.id AS id_clase,
            a.descripcion AS nombre_actividad,
            CONCAT(i.nombre, ' ', i.apellido) AS nombre_instructor,
            CONCAT(t.hora_inicio, ' a ', t.hora_fin) AS turno,
            i.ci AS ci_instructor,
            a.id AS id_actividad,
            t.id AS id_turno,
            c.tipo_clase, 
            c.aforo, 
            c.dictada,
            a.costo AS costo_actividad,
            (
                SELECT 
                    IFNULL(SUM(e.costo), 0)
                FROM 
                    obligatorio.equipamiento e
                JOIN 
                    obligatorio.actividad_equipamiento ae ON e.id = ae.id_equipamiento
                WHERE 
                    ae.id_actividad = c.id_actividad
            ) AS costo_equipamiento,
            GROUP_CONCAT(DISTINCT CONCAT(al.nombre, ' ', al.apellido) SEPARATOR ', ') AS alumnos_inscritos
        FROM 
            obligatorio.clase c
        JOIN 
            obligatorio.actividades a ON c.id_actividad = a.id
        JOIN 
            obligatorio.instructores i ON c.ci_instructor = i.ci
        JOIN 
            obligatorio.turnos t ON c.id_turno = t.id
        LEFT JOIN 
            obligatorio.alumno_clase ac ON c.id = ac.id_clase
        LEFT JOIN 
            obligatorio.alumnos al ON ac.ci_alumno = al.ci
        WHERE id_clase = %s
        """, (id,))


        clase = cursor.fetchone()

        if not clase:
            cursor.close()
            connection.close()
            return jsonify({"error": "Clase no encontrada"}), 404

        cursor.close()
        connection.close()


        return jsonify(clase), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
