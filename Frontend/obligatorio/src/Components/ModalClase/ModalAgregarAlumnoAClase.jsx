import React, { useEffect, useState } from "react";

const ModalAgregarAlumnoAClase = ({ clase, onClose }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [equipamiento, setEquipamiento] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [selectedEquipamiento, setSelectedEquipamiento] = useState([]);

  // Obtener los alumnos y equipamiento disponibles al cargar el modal
  useEffect(() => {
    const fetchAlumnos = async () => {
        try {
            const response = await fetch("http://localhost:5000/alumnos");
            const data = await response.json();
            setAlumnos(data);
          } catch (error) {
            console.error("Error al obtener alumnos:", error);
          }
    };

    const fetchEquipamiento = async () => {
        try {
            const response = await fetch("http://localhost:5000/equipamiento");
            const data = await response.json();
            setEquipamiento(data);
          } catch (error) {
            console.error("Error al obtener equipamiento:", error);
          }
    };

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
            const response = await fetch("http://localhost:5000/alumnos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectedAlumno),
            });
            if (response.ok) {
              fetchAlumnos(); // Recargar los alumnos
              handleCloseModal();
            }
          } catch (error) {
            console.error("Error al agregar alumno:", error);
          }
      console.log("Alumno agregado:", selectedAlumno);
      console.log("Equipamiento seleccionado:", selectedEquipamiento);
      onClose();
    } else {
      alert("Debes seleccionar un alumno");
    }
  };

  return (
    <div className="modal">
      <h3>Agregar Alumno a la Clase {clase.id}</h3>
      
      {/* Lista de alumnos */}
      <div>
        <h4>Selecciona un Alumno</h4>
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

      <button onClick={handleAgregar}>Agregar</button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ModalAgregarAlumnoAClase;
