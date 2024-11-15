import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import ModalAgregarAlumno from "../../Components/ModalAlumno/ModalAgregarAlumno";
import ModalEditarAlumno from "../../Components/ModalAlumno/ModalEditarAlumno";
import Modal from "../../Components/Modal/Modal";
import "./alumno.css";

const Alumnos = () => {
  const navigate = useNavigate();
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
    <div className="container">
      <button className="back-button" onClick={() => navigate('/home')}>
        Back
      </button>
      <h2 className="título-alumnos">Gestión de Alumnos</h2>
      <button
        className="button-agregar-alumno"
        onClick={() => handleOpenModal("add")}
      >
        Agregar Alumno
      </button>

      <h3 className="subtítulo-alumnos">Lista de Alumnos</h3>
      <ul className="lista-alumnos">
        {alumnos.map((alumno) => (
          <li key={alumno.ci}>
            <div className="alumno-info">
              {alumno.nombre} {alumno.apellido} - CI: {alumno.ci}
            </div>
            <div className="alumno-buttons">
              <button onClick={() => handleOpenModal("edit", alumno)}>
                Editar
              </button>
              <button onClick={() => handleDeleteAlumno(alumno.ci)}>
                Eliminar
              </button>
            </div>
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
          <ModalEditarAlumno
            alumno={selectedAlumno}
            onSubmit={handleEditAlumno}
          />
        </Modal>
      )}
    </div>
  );
};

export default Alumnos;
