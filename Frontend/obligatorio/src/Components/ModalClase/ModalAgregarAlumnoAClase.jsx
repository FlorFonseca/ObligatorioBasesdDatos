import React, { useEffect, useState } from "react";
import './ModalAgregarAlumnoAClase.css';

const ModalAgregarAlumnoAClase = ({ clase, onClose }) => {
    const [alumnos, setAlumnos] = useState([]);
    const [equipamiento, setEquipamiento] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedEquipamiento, setSelectedEquipamiento] = useState([]);

    const fetchAlumnos = async () => {
        try {
            const response = await fetch(`http://localhost:5000/clase/${clase.id_clase}/alumnos_disponibles`);
            const data = await response.json();
            setAlumnos(data);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
        }
    };

    const fetchEquipamiento = async () => {
            try {
                const response = await fetch(`http://localhost:5000/clase/${clase.id_clase}/equipamiento`);
                const data = await response.json();
                setEquipamiento(data);
            } catch (error) {
                console.error("Error al obtener equipamiento:", error);
            }
        };

    // Obtener los alumnos y equipamiento disponibles al cargar el modal
    useEffect(() => {
        fetchAlumnos();
        fetchEquipamiento();
    }, [clase]);

    const handleSelectAlumno = (alumno) => {
        setSelectedAlumno(alumno);
    };

    const handleSelectEquipamiento = (equip) => {
        setSelectedEquipamiento((prevSelected) =>
            prevSelected.includes(equip)
                ? prevSelected.filter((e) => e !== equip)
                : [...prevSelected, equip]
        );
    };

    const handleAgregar = async () => {
        if (selectedAlumno) {
            try {
                const response = await fetch(`http://localhost:5000/clase/${clase.id_clase}/alumno`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ci: selectedAlumno.ci,
                        equipamiento: selectedEquipamiento,
                    }),
                });
                if (response.ok) {
                    fetchAlumnos(); // Actualizar la lista de alumnos disponibles
                    console.log("Alumno agregado exitosamente");
                    onClose(); // Cerrar el modal después de agregar el alumno
                } else {
                    console.log("Hubo un problema al agregar el alumno");
                }
            } catch (error) {
                console.error("Error al agregar alumno:", error);
            }
        } else {
            alert("Debes seleccionar un alumno");
        }
    };

    return (
        <div className="modal-agregar-alumno">
            <div className="modal-agregar-alumno-content">
                <h3>Agregar Alumno a la Clase {clase.id}</h3>

                {/* Lista de alumnos */}
                <div>
                    <h4>Selecciona un Alumno</h4>
                    {alumnos.length > 0 ? (
                        <div>
                            {alumnos.map((alumno) => (
                                <div key={alumno.ci}>
                                    <input
                                        type="radio"
                                        id={alumno.ci}
                                        name="alumno"
                                        value={alumno.ci}
                                        onChange={() => handleSelectAlumno(alumno)}
                                    />
                                    <label htmlFor={alumno.ci}>
                                        {alumno.nombre} {alumno.apellido}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay alumnos disponibles</p>
                    )}
                </div>

                {/* Lista de equipamiento */}
                <div>
                    <h4>Selecciona Equipamiento (Opcional)</h4>
                    {equipamiento.map((equip) => (
                        <div key={equip.id}>
                            <input
                                type="checkbox"
                                id={equip.id}
                                value={equip.id}
                                onChange={() => handleSelectEquipamiento(equip.id)}
                            />
                            <label htmlFor={equip.id}>{equip.descripcion}</label>
                        </div>
                    ))}
                </div>

                <button className="button-add-alumno" onClick={handleAgregar}>Agregar</button>
                <button className="cerrar-alumno" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalAgregarAlumnoAClase;
