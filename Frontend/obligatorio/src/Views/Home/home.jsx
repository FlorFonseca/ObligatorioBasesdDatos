import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <button className="logout-button" onClick={() => navigate('/')}>
                Logout
            </button>
            <h1 className='home-title'>Bienvenido</h1>
            <button className='home-button' onClick={() => navigate('/instructores')}>
                Ir a Instructores
            </button>
            <button className='home-button' onClick={() => navigate('/alumnos')}>
                Ir a Alumnos
            </button>
            <button className='home-button' onClick={() => navigate('/actividades')}>
                Ir a Actividades
            </button>
            <button className='home-button' onClick={() => navigate('/turnos')}>
                Ir a Turnos
            </button>
            <button className='home-button' onClick={() => navigate('/reportes')}>
                Reportes
            </button>
        </div>
    );
}

export default Home;