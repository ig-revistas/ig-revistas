import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import Login from './componentes/Login';
import Registro from './componentes/Register';
import RevistaForm from './componentes/proteguidas/RevistaForm';
import PrivateRoute from './componentes/PrivateRoute';
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
