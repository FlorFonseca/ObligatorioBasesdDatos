import React, { useState } from "react";

const ModalAgregarAlumno = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ci: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    num_contacto: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamar a la función para agregar alumno
    setFormData({
      ci: "",
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      num_contacto: "",
      email: "",
    }); // Limpiar los campos después de enviar
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Alumno</h2>
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
      <label>Fecha de Nacimiento:</label>
      <input
        type="date"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleChange}
        required
      />
      <label>Contacto:</label>
      <input
        type="text"
        name="num_contacto"
        value={formData.num_contacto}
        onChange={handleChange}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ModalAgregarAlumno;
