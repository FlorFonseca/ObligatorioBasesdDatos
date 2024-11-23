import React, { useState, useEffect } from "react";
import "../ModalAgregarEditar.css";

const ModalEditarClase = ({ clase, onSubmit }) => {
  const [formData, setFormData] = useState(clase);
  const [availableInstructorsCi, setAvailableInstructorsCi] = useState([]);
  const [availableTurnos, setAvailableTurnos] = useState([]);

  useEffect(() => {
    setFormData(clase);
  }, [clase]);

  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/clase/${clase.id_clase}/instructores_disponibles`
        );
        const data = await response.json();
        setAvailableInstructorsCi(data);
      } catch (error) {
        console.error("Error al obtener instructores:", error);
      }
    };

    fetchInstructores();
  }, [clase.id_clase]);

  // Obtener turnos disponibles
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/clase/${clase.id_clase}/turnos_disponibles`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setAvailableTurnos(data);
        } else {
          console.error("Respuesta de API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };

    fetchTurnos();
  }, [clase.id_clase]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Clase</h2>
      <label htmlFor="idClase">ID Clase:</label>
      <input
        type="text"
        id="idClase"
        name="id"
        value={formData.id_clase}
        onChange={handleChange}
        disabled
      />
      <label htmlFor="ciInstructor">CI Instructor:</label>
      <select
        id="ciInstructor"
        name="ci_instructor"
        value={formData.ci_instructor}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar...</option>
        {availableInstructorsCi.map((instructor) => (
          <option key={instructor.ci} value={instructor.ci}>
            {instructor.nombre} {instructor.apellido} (CI: {instructor.ci})
          </option>
        ))}
      </select>
      <label htmlFor="idActividad">ID Actividad:</label>
      <input
        type="text"
        id="idActividad"
        name="id_actividad"
        value={formData.id_actividad}
        onChange={handleChange}
        required
      />
      <label htmlFor="idTurno">ID Turno:</label>
      <select
        id="idTurno"
        name="id_turno"
        value={formData.id_turno}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar...</option>
        {availableTurnos.map((turno) => (
          <option key={turno.id} value={turno.id}>
            ({turno.hora_inicio} - {turno.hora_fin})
          </option>
        ))}
      </select>
      <label htmlFor="tipoClase">Tipo Clase:</label>
      <select
        name="tipo_clase"
        id="tipoClase"
        value={formData.tipo_clase}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar...</option>
        <option value="Grupal">Grupal</option>
        <option value="Individual">Individual</option>
      </select>
      <label htmlFor="aforo">Aforo:</label>
      <input
        type="number"
        id="aforo"
        name="aforo"
        value={formData.aforo}
        onChange={handleChange}
        required
      />
      <label htmlFor="dictada">¿Dictada?</label>
      <input
        type="checkbox"
        id="dictada"
        name="dictada"
        checked={formData.dictada}
        onChange={handleChange}
      />

      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarClase;
