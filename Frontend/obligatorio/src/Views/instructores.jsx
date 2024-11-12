import React, { useState, useEffect } from 'react';

const Instructores = () => {
  const [instructores, setInstructores] = useState([]);
  const [formData, setFormData] = useState({
    ci: '',
    nombre: '',
    apellido: '',
  });

  // Función para obtener todos los instructores
  useEffect(() => {
    fetch('http://localhost:5000/instructores') // Ruta a tu endpoint de instructores
      .then(response => response.json())
      .then(data => setInstructores(data))
      .catch(error => console.error('Error al obtener instructores:', error));
  }, []);

  // Función para manejar el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para agregar un nuevo instructor
  const addInstructor = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/instructores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error al crear instructor');
      })
      .then(() => {
        // Añade el instructor a la lista de instructores
        setInstructores([...instructores, formData]);
        setFormData({ ci: '', nombre: '', apellido: '' });
      })
      .catch(error => console.error('Error al agregar instructor:', error));
  };

  return (
    <div>
      <h2>Gestión de Instructores</h2>
      <form onSubmit={addInstructor}>
        <input
          type="text"
          name="ci"
          placeholder="Cédula"
          value={formData.ci}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Instructor</button>
      </form>

      <h3>Lista de Instructores</h3>
      <ul>
        {instructores.map((instructor) => (
          <li key={instructor.ci}>
            {instructor.nombre} {instructor.apellido} - CI: {instructor.ci}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instructores;
