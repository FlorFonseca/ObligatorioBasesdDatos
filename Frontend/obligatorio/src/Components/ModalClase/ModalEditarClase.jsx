import React, { useState, useEffect } from "react";
import "../ModalAgregarEditar.css";

const ModalEditarClase = ({ clase, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    ci_instructor: "",
    id_actividad: "",
    id_turno: "",
    tipo_clase: "",
    aforo: "",
    dictada: false,
  });

  useEffect(() => {
    if (clase) {
      setFormData(clase);
    }
  }, [clase]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Clase</h2>
      <label>ID Clase:</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <label>CI Instructor:</label>
      <input
        type="number"
        name="ci_instructor"
        value={formData.ci_instructor}
        onChange={handleChange}
        required
      />
      <label>ID Actividad:</label>
      <input
        type="number"
        name="id_actividad"
        value={formData.id_actividad}
        onChange={handleChange}
        required
      />
      <label>ID Turno:</label>
      <input
        type="number"
        name="id_turno"
        value={formData.id_turno}
        onChange={handleChange}
        required
      />
      <label>Tipo Clase:</label>
      <select
        type="number"
        name="tipo_clase"
        value={formData.tipo_clase}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar...</option>
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
      <label>¿Dictada?</label>
      <input
        type="checkbox"
        name="dictada"
        checked={formData.dictada}
        onChange={handleChange}
      />

      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarClase;
