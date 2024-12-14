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
import Settings from './componentes/menuUsuario/settings/Settings';
import { AuthProvider } from "./context/authprovider";
import './css/App.css';
import ReservaPendienteComponent from './componentes/listaDeReserva/ReservaPendienteComponent'; // Para reservas pendientes
import ReservaAprobadaComponent from './componentes/listaDeReserva/ReservaAprobadaComponent'; // Para reservas aprobadas
import EditarRevistaForm from './componentes/revistaForm/EditarRevistaForm';
import RestablecerContrasenia from './componentes/login/RestablecerContrasenia';
import SolicitarRestauracion from './componentes/login/SolicitarRestablecimiento';
import ReporteRevistas from './componentes/ReporteRevsita/ReporteRevistas';
import Reporte from './componentes/reporte/Reporte';

const App: React.FC = () => {
    const { revistas, error, loading } = useRevistas();
    
    return (
        <AuthProvider>  {/* Aseguramos que AuthProvider envuelva la aplicación */}
            <Router>
                <div className="App">
                    <Navbar revistas={revistas} />
                    
                    {loading && <p>Cargando revistas...</p>}
                    {error && <p>{error}</p>}

                    <Routes>
                        <Route 
                            path="/revistas" 
                            element={
                                <PrivateRoute rol="ADMIN_ROLE">
                                    <ListadoDeRevistas revistas={revistas} />
                                </PrivateRoute>
                            } />
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

                        <Route 
                            path="/editarRevista/:id" 
                            element={
                                <PrivateRoute rol="ADMIN_ROLE">
                                    <EditarRevistaForm />
                                </PrivateRoute>
                            }
                        />
                        <Route 
                            path='/reporte-revistas'
                            element={
                                <PrivateRoute rol="OPERADOR_ROLE">
                                    <ReporteRevistas />
                                </PrivateRoute>
                            }          
                        />
                         <Route path="/settings" element={<Settings />} />
                         <Route path="/restablecer-contrasenia" element={<RestablecerContrasenia />} />
                         <Route path="/solicitar-restauracion" element={<SolicitarRestauracion />} />
                         <Route path='/reporte' element={<Reporte/>}/>
                         <Route 
                            path='/reservasPendientes'
                            element={
                                <PrivateRoute rol="OPERADOR_ROLE">
                                    <ReservaPendienteComponent /> {/* Para reservas pendientes */}
                                </PrivateRoute>
                            }          
                        />
                         <Route 
                            path='/reservasAprobadas'
                            element={
                                <PrivateRoute rol="OPERADOR_ROLE">
                                    <ReservaAprobadaComponent /> {/* Para reservas aprobadas */}
                                </PrivateRoute>
                            }          
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
