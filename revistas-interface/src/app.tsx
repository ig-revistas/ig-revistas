import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import RegistroFechas from './registro-fechas';

function App() {
    return (
        <Router>
            <main className='App'>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro-fechas" element={<RegistroFechas />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
