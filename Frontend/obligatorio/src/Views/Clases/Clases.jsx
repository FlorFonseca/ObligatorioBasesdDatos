import React, { useState, useEffect } from "react";
import "./Clases.css";
import ClassCard from "../../Components/Card/ClassCard";
import ModalAgregarClase from "../../Components/ModalClase/ModalAgregarClase";
import ModalEditarClase from "../../Components/ModalClase/ModalEditarClase";
import Modal from "../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";


export default function Clases() {
  const [clases, setClases] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const navigate = useNavigate();

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

  useEffect(() => {
    handleGetClases();
  }, []);

  const handleAddClass = async (newClass) => {
    try {
      console.log("Datos enviados para crear la clase:", newClass); // Log de los datos enviados
      const response = await fetch("http://localhost:5000/clase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        const addedClass = await response.json();
        setClases((prevClases) => [...prevClases, addedClass]);
        handleGetClases();
        setShowModal(false);
      } else {
        console.log("error agregando la clase");
      }
    } catch (error) {
      console.log("error agregando la clase", error);
    }
  };

  const handleEditClass = async (updatedClass) => {
    console.log("Actualizando clase con datos:", updatedClass);
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
        const updatedData = await response.json();
        setClases((prevClases) =>
          prevClases.map((clase) =>
            clase.id_clase === updatedData.id_clase ? updatedData : clase
          )
        );
        handleGetClases();
        setShowModal(false);
      } else {
        console.error("Error al editar la clase.");
      }
    } catch (error) {
      console.error("Error al editar la clase:", error);
    }
  };

  const handleDeleteClass = async (deletedClass) => {
    try {
      // Realizar la solicitud DELETE al servidor
      const response = await fetch(
        `http://localhost:5000/clase/${deletedClass.id_clase}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar si la respuesta es correcta
      if (response.ok) {
        const result = await response.json(); // Procesar la respuesta en JSON

        // Actualizar el estado de las clases eliminando la clase eliminada
        setClases((prevClases) =>
          prevClases.filter((clase) => clase.id_clase !== deletedClass.id_clase)
        );

        console.log(result.message || "Clase eliminada exitosamente.");
      } else {
        // Manejar errores específicos enviados por el backend
        const errorData = await response.json();
        alert(
          errorData.error
        );
      }
    } catch (error) {
      // Manejar errores de conexión u otros imprevistos
      console.error("Error al eliminar la clase:", error.message);
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

  const handleDetails = (id) => {
    navigate(`/clases/${id}`); // Redirige a la página de detalles
  };

  return (
    <div className="container">
      <h1 className="titulo-clases">Gestión de Clases</h1>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Formulario para agregar clases */}
      <button onClick={() => handleOpenModal("add")}>Agregar Clase</button>

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
              onDetails={() => handleDetails(clase.id_clase)}
              onDelete={() => handleDeleteClass(clase)}
            />
          ))
        ) : (
          <p>No hay clases disponibles.</p>
        )}
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          {modalType === "add" && <ModalAgregarClase onSubmit={handleAddClass} />}
          {modalType === "edit" && (
            <ModalEditarClase
              clase={selectedClass}
              onSubmit={handleEditClass}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
