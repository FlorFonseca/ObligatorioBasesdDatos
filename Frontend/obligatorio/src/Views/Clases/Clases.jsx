import React, { useState, useEffect } from "react";
import "./Clases.css";
import ClassCard from "../../Components/Card/ClassCard";
import ModalAgregarClase from "../../Components/ModalClase/ModalAgregarClase";
import ModalEditarClase from "../../Components/ModalClase/ModalEditarClase";
import Modal from "../../Components/Modal/Modal";

export default function Clases() {
  const [clases, setClases] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");

  //el back devuelve una lista de todas las clases
  useEffect(() => {
    const handleGetClases = async () => {
      try {
        const response = await fetch("http://localhost:5000/clases", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const classData = await response.json(); //obtengo todo el array de clases
          setClases(classData);
        }
      } catch (error) {
        console.log("error al obtener las clases", error);
      }
    };
    handleGetClases();
  }, []);

  const handleAddClass = async (newClass) => {
    try {
      const response = await fetch("http://localhost:5000/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        const addedClass = await response.json();
        console.log(addedClass);
        setClases((prevClases) => [...prevClases, newClass]);
        setShowModal(false);
      } else {
        console.log("error agregando la clase");
      }
    } catch (error) {
      console.log("error agregando la clase", error);
    }
  };

  const handleEditClass = async (updatedClass) => {
    try {
      const response = await fetch(
        `http://localhost:5000/clase/${updatedClass.id_clase}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedClass),
        }
      );

      if (response.ok) {
        setClases((prevClases) =>
          prevClases.map((clase) =>
            clase.id_clase === updatedClass.id_clase ? updatedClass : clase
          )
        );
        setShowModal(false);
      } else {
        console.error("Error al editar la clase.");
      }
    } catch (error) {
      console.error("Error al editar la clase:", error);
    }
  };

  const handleDeleteClass = async (idClase) => {
    try {
      const response = await fetch(`http://localhost:5000/clase/${idClase}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setClases((prevClases) =>
          prevClases.filter((clase) => clase.id_clase !== idClase)
        );
      } else {
        console.error("Error al eliminar la clase.");
      }
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  const handleOpenModal = (type, clase = null) => {
    setModalType(type);
    setSelectedClass(clase);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  return (
    <div className="container">
      <h1 className="titulo-clases">Gestión de Clases</h1>

      {/* Formulario para agregar clases */}
      <button onClick={() => handleOpenModal("add")}>Agregar Clase</button>
      {showModal && modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <ModalAgregarClase onAdd={handleAddClass} />
        </Modal>
      )}

      <button onClick={() => handleOpenModal("edit")}>Editar Clase</button>
      {showModal && modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <ModalEditarClase onEdit={handleEditClass} />
        </Modal>
      )}
      {/* Listado de clases */}
      <h3>Listado de Clases</h3>
      <div className="clases-container">
        {clases && clases.length > 0 ? (
          clases.map((clase) => (
            <ClassCard
              key={clase.id_clase}
              clase={clase}
              nombreActividad={clase.nombre_actividad}
              nombreInstructor={clase.nombre_instructor}
              turno={clase.turno}
              tipoClase={clase.tipo_clase}
              aforo={clase.aforo}
              dictada={clase.dictada}
              onEdit={() => handleOpenModal("edit", clase)}
              onDetails={() => handleOpenModal("details", clase)}
              onDelete={() => handleDeleteClass(clase.id_clase)}
            />
          ))
        ) : (
          <p>No hay clases disponibles.</p>
        )}
      </div>
    </div>
  );
}