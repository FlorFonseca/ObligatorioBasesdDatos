import Login from "./Views/Login";
import Alumnos from "./Views/alumno";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Instructores from './Views/instructores';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/instructores" element={<Instructores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
