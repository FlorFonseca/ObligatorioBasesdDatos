import React, { useState, useEffect } from "react";
import "../ModalAgregarEditar.css";

const ModalEditarClase = ({clase, onSubmit}) => {
  const [formData, setFormData] = useState(clase);


  useEffect(() => {
      setFormData(clase);
  }, [clase]);


    console.log("clase a editar", clase);

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
      <input
        type="number"
        id="ciInstructor"
        name="ci_instructor"
        value={formData.ci_instructor}
        onChange={handleChange}
        required
      />
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
      <input
        type="text"
        id="idTurno"
        name="id_turno"
        value={formData.id_turno}
        onChange={handleChange}
        required
      />
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
