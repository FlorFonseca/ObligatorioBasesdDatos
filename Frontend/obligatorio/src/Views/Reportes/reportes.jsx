import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reportes.css";

const Reportes = () => {
  const [data, setData] = useState({ ingresos: [], alumnos: [], turnos: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/reportes")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/home")}>
        Back
      </button>
      <h2 className="título-reportes">Reportes</h2>
      <br />
      <div className="reportes-grid">
        <div className="reporte-columna">
          <h3 className="subtítulo-reportes">Actividades que más ingresos generan</h3>
          <ul className="lista-reportes">
            {data.ingresos.map((ingreso, index) => (
              <li key={index}>
                <div className="reporte-info">
                  {ingreso.descripcion}: ${ingreso.total_ingreso}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="reporte-columna">
          <h3 className="subtítulo-reportes">Actividades con más alumnos</h3>
          <ul className="lista-reportes">
            {data.alumnos.map((alumno, index) => (
              <li key={index}>
                <div className="reporte-info">
                  {alumno.descripcion}: {alumno.total_alumnos} alumnos
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="reporte-columna">
          <h3 className="subtítulo-reportes">Turnos con más clases dictadas</h3>
          <ul className="lista-reportes">
            {data.turnos.map((turno, index) => (
              <li key={index}>
                <div className="reporte-info">
                  Turno {turno.id}: {turno.total_clases} clases
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
