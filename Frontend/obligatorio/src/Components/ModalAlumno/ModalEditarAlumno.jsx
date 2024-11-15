import React, { useState, useEffect } from "react";
import '../ModalAgregarEditar.css'

const ModalEditarAlumno = ({ alumno, onSubmit }) => {
  const [formData, setFormData] = useState(alumno);

  useEffect(() => {
    setFormData(alumno); // Actualizar los datos al recibir un alumno
  }, [alumno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamar a la función para editar alumno
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Alumno</h2>
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
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ModalEditarAlumno;

