import React, { useState, useEffect } from "react";
import '../ModalAgregarEditar.css'

const ModalEditarTurno = ({ turno, onSubmit }) => {
  const [formData, setFormData] = useState(turno);

  useEffect(() => {
    setFormData(turno); 
  }, [turno]);

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
      <h2>Editar Turno</h2>
      <label>Id:</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        disabled
      />
      <label>Hora inicio:</label>
      <input
        type="time"
        name="hora_inicio"
        value={formData.hora_inicio}
        onChange={handleChange}
        required
      />
      <label>Hora fin:</label>
      <input
        type="time"
        name="hora_fin"
        value={formData.hora_fin}
        onChange={handleChange}
        required
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarTurno;

