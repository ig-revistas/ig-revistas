import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/navbar/Navbar';
import Home from './componentes/home/Home';
import Login from './componentes/login/Login';
import Registro from './componentes/register/Register';
import RevistaForm from './componentes/revistaForm/RevistaForm';
import PrivateRoute from './componentes/rutaPrivada/RutaPrivada';
import './css/App.css';

function App() {
   

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    
                    <Route path='/login' element={<Login />}/>
                    <Route path='/registro' element={<Registro/>}/>
                    
                    <Route path="/new_revista"
                    element={
                        <PrivateRoute rol={'ADMIN_ROLE'}>
                            <RevistaForm  />
                        </PrivateRoute>
                    }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
