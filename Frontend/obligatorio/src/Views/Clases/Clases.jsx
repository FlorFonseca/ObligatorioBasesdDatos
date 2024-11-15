import React, { useState } from "react";
import "./Clases.css";

export default function Clase() {
  const [clases, setClases] = useState([]);
  const [idClase, setIdClase] = useState("");
  const [ciInstructor, setCiInstructor] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [idTurno, setIdTurno] = useState("");
  const [tipoClase, setTipoClase] = useState("");
  const [aforo, setAforo] = useState(0);

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idClase,
          ciInstructor,
          idActividad,
          idTurno,
          tipoClase,
          aforo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1 className="titulo-clases">Clases</h1>

      <h3 className="subtítulo-clases">Listado de clases</h3>
      <ul className="lista-clases">
        {clases.map((clase) => (
          <li key={clase.id}>
            <div className="clase-info">
              {actividad.descripcion} - Costo: {actividad.costo} - Edad mínima:{" "}
              {actividad.restriccion_edad}
            </div>
            <div className="actividad-button">
              <button onClick={() => handleOpenModal("edit", actividad)}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <ModalEditarActividad
            actividad={selectedActividad}
            onSubmit={handleEditActividad}
          />
        </Modal>
      )}
    </div>
  );
}
