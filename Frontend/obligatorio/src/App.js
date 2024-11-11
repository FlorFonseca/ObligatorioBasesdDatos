import Login from "./Views/Login";
import Alumnos from "./Views/alumno";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alumnos" element={<Alumnos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
