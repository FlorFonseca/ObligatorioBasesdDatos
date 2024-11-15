import React from 'react';
import "./Login.css";
import { useState } from 'react';

export default function Login() {
    const [correo, setCorreo] = useState(''); 
    const [password, setPassword] = useState('');

    const handlePrueba = async () => {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ correo, password }),
      });
      const data = await response.json();
      
      if(response.ok){
        console.log("logueado");
      }
    };

    return (
      <div className="container">
        
        <form className="form" onSubmit={handlePrueba}>
          <div className='titulo'>Bienvenid@</div>
          <div className="input1">
            <input
              className="input"
              type="email"
              value={correo}
              placeholder='Email'
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input2">
            <input
              className="password"
              type="password"
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="LoginandSignUp-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    );
}
