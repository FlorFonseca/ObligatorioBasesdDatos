import React, { useState, useEffect } from "react";
import ModalAgregarAlumno from "../Components/ModalAgregarAlumno";
import ModalEditarAlumno from "../Components/ModalEditarAlumno";
import Modal from "../Components/Modal";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" o "edit"
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  // Obtener los alumnos al cargar el componente
  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch("http://localhost:5000/alumnos");
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

  const handleOpenModal = (type, alumno = null) => {
    setModalType(type);
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null); // Limpiar selección al cerrar el modal
  };

  const handleAddAlumno = async (newAlumno) => {
    try {
      const response = await fetch("http://localhost:5000/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlumno),
      });
      if (response.ok) {
        fetchAlumnos(); // Recargar los alumnos
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al agregar alumno:", error);
    }
  };

  const handleEditAlumno = async (updatedAlumno) => {
    try {
      const response = await fetch(`http://localhost:5000/alumnos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAlumno),
      });
      if (response.ok) {
        fetchAlumnos(); // Recargar los alumnos
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al editar alumno:", error);
    }
  };

  const handleDeleteAlumno = async (ci) => {
    try {
      const response = await fetch(`http://localhost:5000/alumnos/${ci}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchAlumnos(); // Recargar los alumnos después de eliminar
      }
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Alumnos</h1>
      <button onClick={() => handleOpenModal("add")}>Agregar Alumno</button>

      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.ci}>
            {alumno.nombre} {alumno.apellido}
            <button onClick={() => handleOpenModal("edit", alumno)}>Editar</button>
            <button onClick={() => handleDeleteAlumno(alumno.ci)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {showModal && modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <ModalAgregarAlumno onSubmit={handleAddAlumno} />
        </Modal>
      )}

      {showModal && modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <ModalEditarAlumno alumno={selectedAlumno} onSubmit={handleEditAlumno} />
        </Modal>
      )}
    </div>
  );
};

export default Alumnos;

