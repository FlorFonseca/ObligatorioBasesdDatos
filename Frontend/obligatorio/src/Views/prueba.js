import React from 'react';
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
      <form className="form" onSubmit={handlePrueba}>
        <div className="container">
          <div className="input1">
            <input
              className="input"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input2">
            <input
              className="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="LoginandSignUp-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    );
}
