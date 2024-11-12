import React, { useState } from "react";
import './ModalAgregarEditar.css'


const ModalAgregarInstructor = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ci: "",
    nombre: "",
    apellido: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
    setFormData({
      ci: "",
      nombre: "",
      apellido: "",
    }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Instructor</h2>
      <label>CI:</label>
      <input
        type="text"
        name="ci"
        value={formData.ci}
        onChange={handleChange}
        required
      />
      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <label>Apellido:</label>
      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ModalAgregarInstructor;
