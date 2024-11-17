import React from "react";

const ModalDetallesClase = ({ clase, onClose }) => {
  // Manejo de posibles datos faltantes
  const alumnos = clase.alumnos_inscritos 
    ? clase.alumnos_inscritos.split(", ") 
    : [];

  return (
    console.log("alumnos", clase.alumnos_inscritos),
    <div className="modal">
      <div className="modal-content">
        <h2>Detalles de la Clase</h2>
        <p><strong>Actividad:</strong> {clase.nombre_actividad}</p>
        <p><strong>Instructor:</strong> {clase.nombre_instructor}</p>
        <p><strong>Turno:</strong> {clase.turno}</p>
        <p><strong>Tipo de Clase:</strong> {clase.tipo_clase}</p>
        <p><strong>Aforo:</strong> {clase.aforo}</p>
        <p><strong>¿Dictada?</strong> {clase.dictada ? "Sí" : "No"}</p>
        <p><strong>Precio de la Clase:</strong> ${clase.costo_actividad}</p>
        <p><strong>Precio de Equipamiento:</strong> ${clase.costo_equipamiento}</p>
        <h3>Alumnos que asisten a esta clase:</h3>
        <ul>
          {alumnos.map((alumno, index) => (
            <li key={index}>{alumno}</li>
          ))}
        </ul>
        <button>Agregar alumno</button>
      </div>
    </div>
  );
};

export default ModalDetallesClase;
