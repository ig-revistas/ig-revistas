import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'; 
import useRevistas from './hooks/useRevistas'; 
import Navbar from './componentes/navbar/Navbar';
import Home from './componentes/home/Home';
import Login from './componentes/login/Login';
import Registro from './componentes/register/Register';
import RevistaForm from './componentes/revistaForm/RevistaForm';
import DetalleRevista from './componentes/detalleRevista/DetalleRevista'; 
import PrivateRoute from './componentes/rutaPrivada/RutaPrivada';
import './css/App.css';
import Catalogo from './componentes/catalogo/Catalogo';
import EditarRevistaForm from './componentes/revistaForm/EditarRevistaForm';
import EliminarRevistaForm from './componentes/revistaForm/EliminarRevistaForm';

const App: React.FC = () => {
    const { revistas, error, loading } = useRevistas();

    return (
        <Router>
            <div className="App">
                <Navbar revistas={revistas} />
                
                {loading && <p>Cargando revistas...</p>}
                {error && <p>{error}</p>}

                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    
                    {/* Ruta para nueva revista (solo ADMIN) */}
                    <Route 
                        path="/new_revista"
                        element={
                            <PrivateRoute rol="ADMIN_ROLE">
                                <RevistaForm />
                            </PrivateRoute>
                        }
                    />
                    
                    {/* Ruta para editar revista */}
                    <Route 
                        path="/editar-revista/:id"
                        element={
                            <PrivateRoute rol="ADMIN_ROLE">
                                <EditarRevistaForm />
                            </PrivateRoute>
                        }
                    />

                     {/* Ruta para eliminar revista */}
                     <Route 
                        path="/eliminar-revista/:id"
                        element={
                            <PrivateRoute rol="ADMIN_ROLE">
                                <EliminarRevistaForm />
                            </PrivateRoute>
                        }
                    />
                    
                    {/* Ruta para detalle de revista */}
                    <Route 
                        path="/revista/:id"
                        element={<DetalleRevista revistas={revistas} />} 
                    />
                    
                    {/* Ruta para el catálogo */}
                    <Route path="/catalogo" element={<Catalogo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
