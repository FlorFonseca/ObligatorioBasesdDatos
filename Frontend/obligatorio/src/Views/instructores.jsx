import React, { useState, useEffect } from 'react';
import './instructores.css';
import Modal from '../Components/Modal';
import ModalAgregarInstructor from '../Components/ModalAgregarInstructor';
import ModalEditarInstructor from '../Components/ModalEditarInstructor';

const Instructores = () => {
  const [instructores, setInstructores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    fetchInstructores();
  }, []);

  const fetchInstructores = async () => {
    try {
      const response = await fetch("http://localhost:5000/instructores");
      const data = await response.json();
      setInstructores(data);
    } catch (error) {
      console.error("Error al obtener instructores:", error);
    }
  };

  const handleOpenModal = (type, instructor = null) => {
    setModalType(type);
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInstructor(null);
  };

  const handleAddInstructor = async (newInstructor) => {
    try {
      const response = await fetch("http://localhost:5000/instructores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInstructor),
      });
      if (response.ok) {
        fetchInstructores();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al agregar instructor:", error);
    }
  };

  const handleEditInstructor = async (updatedInstructor) => {
    try {
      const response = await fetch(`http://localhost:5000/instructores`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInstructor),
      });
      if (response.ok) {
        fetchInstructores();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al editar instructor:", error);
    }
  };

  const handleDeleteInstructor = async (ci) => {
    try {
      const response = await fetch(`http://localhost:5000/instructores/${ci}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchInstructores();
      }
    } catch (error) {
      console.error("Error al eliminar instructor:", error);
    }
  };

  return (
    <div className='container'>
      <h2 className='título-instructores'>Gestión de Instructores</h2>
      <button className='button-agregar-instructor' onClick={() => handleOpenModal("add")}>Agregar Instructor</button>

      <h3 className='subtítulo-instructores'>Lista de Instructores</h3>
      <ul className='lista-instructores'>
        {instructores.map((instructor) => (
          <li key={instructor.ci}>
            <div className="instructor-info">
              {instructor.nombre} {instructor.apellido} - CI: {instructor.ci}
            </div>
            <div className="instructor-buttons">
              <button onClick={() => handleOpenModal("edit", instructor)}>Editar</button>
              <button onClick={() => handleDeleteInstructor(instructor.ci)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>


      {showModal && modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <ModalAgregarInstructor onSubmit={handleAddInstructor} />
        </Modal>
      )}

      {showModal && modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <ModalEditarInstructor instructor={selectedInstructor} onSubmit={handleEditInstructor} />
        </Modal>
      )}
    </div>
  );
};

export default Instructores;
