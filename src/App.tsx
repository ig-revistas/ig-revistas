import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'; 
import useRevistas from './hooks/useRevistas'; 
import Navbar from './componentes/navbar/Navbar';
import Home from './componentes/home/Home';
import Login from './componentes/login/Login';
import Registro from './componentes/register/Register';
import RevistaForm from './componentes/revistaForm/RevistaForm';
import DetalleRevista from './componentes/detalleRevista/DetalleRevista';
import ListadoDeRevistas from './componentes/listadoDeRevistas/ListadoDeRevistas'; 
import RevistasReservadas from './componentes/revista/RevistasReservadas/RevistasReservadas';
import PrivateRoute from './componentes/rutaPrivada/RutaPrivada';
import './css/App.css';

const App: React.FC = () => {
    const { revistas, error, loading } = useRevistas();

    return (
        <Router>
            <div className="App">
                <Navbar revistas={revistas} />
                
                {loading && <p>Cargando revistas...</p>}
                {error && <p>{error}</p>}

                <Routes>
                    <Route path="/revistas" element={<ListadoDeRevistas revistas={revistas} />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />                      
                    <Route path="/revistas-reservadas" element={<RevistasReservadas />} />
                    <Route 
                        path="/new_revista"
                        element={
                            <PrivateRoute rol="ADMIN_ROLE">
                                <RevistaForm />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/revista/:id"
                        element={<DetalleRevista revistas={revistas} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
