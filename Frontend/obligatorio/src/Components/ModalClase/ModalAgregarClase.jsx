import React, { useState } from "react";
import "../ModalAgregarEditar.css";

const ModalAgregarClase = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    ci_instructor: "",
    id_actividad: "",
    id_turno: "",
    tipo_clase: "",
    aforo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamar a la función para agregar clase
    setFormData({
      id: "",
      ci_instructor: "",
      id_actividad: "",
      id_turno: "",
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
        name= "id"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <label>CI Instructor:</label>
      <input
        type="text"
        name="ci_instructor"
        value={formData.ci_instructor}
        onChange={handleChange}
        required
      />
      <label>ID Actividad:</label>
      <input
        type="text"
        name="id_actividad"
        value={formData.id_actividad}
        onChange={handleChange}
        required
      />
      <label>ID Turno:</label>
      <input
        type="text"
        name="id_turno"
        value={formData.id_turno}
        onChange={handleChange}
        required
      />
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
