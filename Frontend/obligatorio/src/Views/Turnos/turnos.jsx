import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./turnos.css";
import Modal from "../../Components/Modal/Modal";
import ModalAgregarTurno from "../../Components/ModalTurno/ModalAgregarTurno";
import ModalEditarTurno from "../../Components/ModalTurno/ModalEditarTurno";

const Turnos = () => {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedTurno, setSelectedTurno] = useState(null);

  useEffect(() => {
    fetchTurnos();
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await fetch("http://localhost:5000/turnos");
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al obtener turnos:", error);
    }
  };

  const handleOpenModal = (type, turno = null) => {
    setModalType(type);
    setSelectedTurno(turno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTurno(null);
  };

  const handleAddTurno = async (newTurno) => {
    try {
      const response = await fetch("http://localhost:5000/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTurno),
      });
      if (response.ok) {
        fetchTurnos();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al agregar turno:", error);
    }
  };

  const handleEditTurno = async (updatedTurno) => {
    try {
      const response = await fetch(`http://localhost:5000/turnos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTurno),
      });
      if (response.ok) {
        fetchTurnos();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al editar turno:", error);
    }
  };

  const handleDeleteTurno = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/turnos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTurnos();
      }
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/home')}>
        Back
      </button>
      <h2 className="título-turnos">Gestión de Turnos</h2>
      <button
        className="button-agregar-turno"
        onClick={() => handleOpenModal("add")}
      >
        Agregar Turno
      </button>

      <h3 className="subtítulo-turnos">Lista de Turnos</h3>
      <ul className="lista-turnos">
        {turnos.map((turno) => (
          <li key={turno.id}>
            <div className="turno-info">
              Horario: {turno.hora_inicio} a {turno.hora_fin}
            </div>
            <div className="turno-buttons">
              <button onClick={() => handleOpenModal("edit", turno)}>
                Editar
              </button>
              <button onClick={() => handleDeleteTurno(turno.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <ModalAgregarTurno onSubmit={handleAddTurno} />
        </Modal>
      )}

      {showModal && modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <ModalEditarTurno
            turno={selectedTurno}
            onSubmit={handleEditTurno}
          />
        </Modal>
      )}
    </div>
  );
};

export default Turnos;
