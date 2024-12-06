import React from 'react';
import Navbar from '../navbar/Navbar';
import Revista from '../revista/Revista';
import useRevistas from '../../hooks/useRevistas'; 
import './Catalogo.css'; 

const Catalogo: React.FC = () => {
    const { revistas, error } = useRevistas(); 

    return (
        <div className="catalogo-container">
          
            <Navbar revistas={revistas} />
            {error && <p>{error}</p>}
            {revistas.map(revista => (
                <Revista key={revista.id} revista={revista} />
            ))}
        </div>
    );
};

export default Catalogo;
