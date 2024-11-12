import Login from "./Views/Login";
import Alumnos from "./Views/alumno";
import Instructores from './Views/instructores';
import Actividades from './Views/actividades';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/instructores" element={<Instructores />} />
        <Route path="/actividades" element={<Actividades />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
