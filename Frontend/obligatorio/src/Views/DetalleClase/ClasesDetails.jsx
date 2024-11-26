import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ClaseDetails.css";
import ModalAgregarAlumnoAClase from "../../Components/ModalClase/ModalAgregarAlumnoAClase";

export default function ClasesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clase, setClase] = useState(null);
  const [showAddAlumnoModal, setShowAddAlumnoModal] = useState(false);

  // Función para obtener los detalles de la clase
  const fetchClase = async () => {
    try {
      const response = await fetch(`http://localhost:5000/clase/${id}`);
      if (response.ok) {
        const data = await response.json();
        setClase(data);
        console.log(data);
      } else {
        console.error("Error al obtener los detalles de la clase.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchClase();
  }, [id]);

  if (!clase) {
    return <p>Cargando detalles de la clase...</p>;
  }

  const handleEliminarAlumno = async (ci) => {
    try {
      const response = await fetch(`http://localhost:5000/clase/${id}/alumno/${ci}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Alumno eliminado de la clase con éxito.");
        fetchClase(); // Actualizar los detalles de la clase
      } else {
        console.error("Error al eliminar al alumno.");
        alert("No se pudo eliminar al alumno.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al eliminar al alumno.");
    }
  };

  const handleAgregarAlumno = () => {
    setShowAddAlumnoModal(true);
  };

  return (
    <div className="detalle-clase">
      <h1>Detalles de la Clase</h1>
      <p>
        <strong>Actividad:</strong> {clase.nombre_actividad}
      </p>
      <p>
        <strong>Instructor:</strong> {clase.nombre_instructor}
      </p>
      <p>
        <strong>Turno:</strong> {clase.turno}
      </p>
      <p>
        <strong>Tipo de Clase:</strong> {clase.tipo_clase}
      </p>
      <p>
        <strong>Aforo:</strong> {clase.aforo}
      </p>
      <p>
        <strong>¿Dictada?</strong> {clase.dictada ? "Sí" : "No"}
      </p>
      <p>
        <strong>Precio de la Clase:</strong> ${clase.costo_actividad}
      </p>
      <p>
        <strong>Precio de Equipamiento:</strong> ${clase.costo_equipamiento}
      </p>

      <h3>Alumnos que asisten a esta clase:</h3>
      <ul>
        {clase.alumnos_inscritos.length > 0 ? (
          clase.alumnos_inscritos.map((alumno) => (
            <li key={alumno.ci} className="alumno-item">
              {`${alumno.nombre} ${alumno.apellido}`}
              <button
                onClick={() => handleEliminarAlumno(alumno.ci)}
                className="eliminar-alumno"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay alumnos inscritos en esta clase.</p>
        )}
      </ul>

      <button onClick={() => navigate(-1)}>Volver</button>
      <button onClick={handleAgregarAlumno}>Agregar alumno</button>

      {showAddAlumnoModal && (
        <ModalAgregarAlumnoAClase
          clase={clase}
          onClose={() => {
            setShowAddAlumnoModal(false);
            fetchClase(); // Recargar los detalles de la clase después de cerrar el modal
          }}
        />
      )}
    </div>
  );
}
