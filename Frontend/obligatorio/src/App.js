import Login from "./Views/Login/Login";
import Home from "./Views/Home/home";
import Alumnos from "../src/Views/Alumnos/alumno";
import Instructores from '../src/Views/Instructores/instructores';
import Actividades from '../src/Views/Actividades/actividades';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Clase from "./Views/Clases/Clases";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/instructores" element={<Instructores />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path= "/clases" element={<Clase/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
