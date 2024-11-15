import React, { useState } from "react";
import '../ModalAgregarEditar.css'

const ModalAgregarTurno = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    hora_inicio: "",
    hora_fin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
    setFormData({
      id: "",
      hora_inicio: "",
      hora_fin: "",
    }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Turno</h2>
      <label>Id:</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
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
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ModalAgregarTurno;
