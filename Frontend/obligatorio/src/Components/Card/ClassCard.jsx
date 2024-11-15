import React from "react";
import "./ClassCard.css";

export default function ClassCard({
  nombreActividad,
  nombreInstructor,
  turno,
  tipoClase,
  aforo,
  dictada,
  onEdit,
  onDetails,
  onDelete,
  clase,
}) {
  return (
    <div className="class-card">
      <h3 className="card-title">{nombreActividad}</h3>
      <p>
        <strong>Instructor:</strong> {nombreInstructor}
      </p>
      <p>
        <strong>Turno:</strong> {turno}
      </p>
      <p>
        <strong>Tipo:</strong> {tipoClase}
      </p>
      <p>
        <strong>Aforo:</strong> {aforo}
      </p>
      <p>
        <strong>¿Dictada?</strong> {dictada ? "Sí" : "No"}
      </p>
      <div className="card-buttons">
        <button onClick={() => onEdit(clase)} className="btn btn-edit">
          Editar
        </button>
        <button onClick={() => onDetails(clase)} className="btn btn-details">
          Detalles
        </button>
        <button
          onClick={() => onDelete(clase.id_clase)}
          className="btn btn-delete"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
