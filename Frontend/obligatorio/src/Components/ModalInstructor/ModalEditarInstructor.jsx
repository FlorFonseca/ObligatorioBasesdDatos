import React, { useState, useEffect } from "react";
import '../ModalAgregarEditar.css'

const ModalEditarInstructor = ({ instructor, onSubmit }) => {
  const [formData, setFormData] = useState(instructor);

  useEffect(() => {
    setFormData(instructor); 
  }, [instructor]);

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
      <h2>Editar Instructor</h2>
      <label>CI:</label>
      <input
        type="text"
        name="ci"
        value={formData.ci}
        onChange={handleChange}
        disabled
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
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarInstructor;

