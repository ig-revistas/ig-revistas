import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login'; 

function App() {
    return (
        <Router>
            <main className='App'>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
