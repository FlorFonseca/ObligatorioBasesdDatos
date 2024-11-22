import Login from "./Views/Login/Login";
import Home from "./Views/Home/home";
import Alumnos from "../src/Views/Alumnos/alumno";
import Instructores from '../src/Views/Instructores/instructores';
import Actividades from '../src/Views/Actividades/actividades';
import Clases from "../src/Views/Clases/Clases";
import Turnos from '../src/Views/Turnos/turnos';
import Reportes from '../src/Views/Reportes/reportes';
import ClasesDetails from '../src/Views/DetalleClase/ClasesDetails';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/instructores" element={<Instructores />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/clases/:id" element={<ClasesDetails />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
