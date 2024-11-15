import React, { useState, useEffect } from "react";

const ModalEditarActividad = ({ actividad, onSubmit }) => {
  const [formData, setFormData] = useState(actividad);

  useEffect(() => {
    setFormData(actividad); 
  }, [actividad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Actividad</h2>
      <label>Descripción:</label>
      <input
        type="text"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        required
      />
      <label>Costo:</label>
      <input
        type="number"
        name="costo"
        value={formData.costo}
        onChange={handleChange}
        required
      />
      <label>Restricción de edad:</label>
      <input
        type="number"
        name="restriccion_edad"
        value={formData.restriccion_edad}
        onChange={handleChange}
        required
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarActividad;

