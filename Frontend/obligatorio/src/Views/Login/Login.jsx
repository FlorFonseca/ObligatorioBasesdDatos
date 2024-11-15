import React from 'react';
import "./Login.css";
import { useState } from 'react';

export default function Login() {
    const [correo, setCorreo] = useState(''); 
    const [password, setPassword] = useState('');

    const handlePrueba = async (e) => {
      e.preventDefault();
      try{
          const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, password }),
          });
      
        if(response.ok){
          const data = await response.json();
          console.log(data);
        }
      }catch(error){
        console.log("error", e);
      }
    };

    return (
      <div className="container">
        
        <form className="form" onSubmit={handlePrueba}>
          <div className="titulo">Bienvenid@</div>
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
