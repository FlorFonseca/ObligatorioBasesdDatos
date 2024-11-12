import React, { useState, useEffect } from 'react';
import './actividades.css';
import Modal from '../Components/Modal';
import ModalEditarActividad from '../Components/ModalEditarActividad';

const Actividades = () => {
    const [actividades, setActividades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [selectedActividad, setSelectedActividad] = useState(null);

    useEffect(() => {
        fetchActividades();
    }, []);

    const fetchActividades = async () => {
        try {
            const response = await fetch("http://localhost:5000/actividades");
            const data = await response.json();
            setActividades(data);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    };

    const handleOpenModal = (type, actividad = null) => {
        setModalType(type);
        setSelectedActividad(actividad);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedActividad(null);
    };

    const handleEditActividad = async (updatedActividad) => {
        try {
            const response = await fetch(`http://localhost:5000/actividades/${updatedActividad.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedActividad),
            });
            if (response.ok) {
                fetchActividades();
                handleCloseModal();
            }
        } catch (error) {
            console.error("Error al editar actividad:", error);
        }
    };

    return (
        <div className='container'>
            <h1 className='titulo-actividades'>Gestión de Actividades</h1>

            <h3 className='subtítulo-actividades'>Lista de Actividades</h3>
            <ul className='lista-actividades'>
                {actividades.map((actividad) => (
                    <li key={actividad.id}>
                        <div className="actividad-info">
                            {actividad.descripcion} - Costo: {actividad.costo} - Edad mínima: {actividad.restriccion_edad}
                        </div>
                        <div className="actividad-button">
                            <button onClick={() => handleOpenModal("edit", actividad)}>Editar</button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && modalType === "edit" && (
                <Modal onClose={handleCloseModal}>
                    <ModalEditarActividad actividad={selectedActividad} onSubmit={handleEditActividad} />
                </Modal>
            )}
        </div>
    );
}

export default Actividades;