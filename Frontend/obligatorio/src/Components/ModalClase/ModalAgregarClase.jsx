import React, { useState, useEffect } from "react";
import "../ModalAgregarEditar.css";

const ModalAgregarClase = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    ci_instructor: "",
    id_actividad: "",
    id_turno: "",
    dictada: false,
    tipo_clase: "",
    aforo: "",
  });
  const [instructores, setInstructores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await fetch("http://localhost:5000/instructores");
        const data = await response.json();
        setInstructores(data);
      } catch (error) {
        console.error("Error al cargar los instructores", error);
      }
    };

    const fetchActividades = async () => {
      try {
        const response = await fetch("http://localhost:5000/actividades");
        const data = await response.json();
        setActividades(data);
      } catch (error) {
        console.error("Error al cargar las actividades", error);
      }
    }

    const fetchTurnos = async () => {
      try {
        const response = await fetch("http://localhost:5000/turnos");
        const data = await response.json();
        setTurnos(data);
      }catch (error) {
        console.error("Error al cargar los turnos", error);
      }
    }
    fetchInstructores();
    fetchActividades();
    fetchTurnos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      ci_instructor: parseInt(formData.ci_instructor),  // Convertir a entero
      aforo: parseInt(formData.aforo),  // Convertir a entero
      dictada: formData.dictada === "true", // Asegurarse de que dictada sea un booleano
    };

    onSubmit(submittedData);

    setFormData({
      id: "",
      ci_instructor: "",
      id_actividad: "",
      id_turno: "",
      dictada: false,
      tipo_clase: "",
      aforo: "",
    }); // Limpiar los campos después de enviar
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-clase">
      <h3>Agrega una Clase</h3>
      <label>ID Clase:</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <label>CI Instructor:</label>
      <select
        name="ci_instructor"
        value={formData.ci_instructor}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un instructor</option>
        {instructores.map((instructor) => (
          <option key={instructor.ci} value={instructor.ci}>
            {`${instructor.ci} - ${instructor.nombre} ${instructor.apellido}`}
          </option>
        ))}
      </select>
      <label>ID Actividad:</label>
      <select
        name="id_actividad"
        value={formData.id_actividad}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un id de actividad</option>
        {actividades.map((actividad) => (
          <option key={actividad.id} value={actividad.id}>
            {`${actividad.id} - ${actividad.descripcion} `}
          </option>
        ))}
      </select>
      <label>ID Turno:</label>
      <select
        name="id_turno"
        value={formData.id_turno}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un id de turno</option>
        {turnos.map((turno) => (
          <option key={turno.id} value={turno.id}>
            {`${turno.id} - ${turno.hora_inicio} ${turno.hora_fin}`}
          </option>
        ))}
      </select>
      <label>Dictada:</label>
      <select
        name="dictada"
        value={formData.dictada}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione...</option>
        <option value="true">Si</option>
        <option value="false">No</option>
      </select>

      <label>Tipo Clase:</label>
      <select
        name="tipo_clase"
        value={formData.tipo_clase}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione...</option>
        <option value="Grupal">Grupal</option>
        <option value="Individual">Individual</option>
      </select>
      <label>Aforo:</label>
      <input
        type="number"
        name="aforo"
        value={formData.aforo}
        onChange={handleChange}
        required
      />
      <button type="submit">Agregar Clase</button>
    </form>
  );
};

export default ModalAgregarClase;
