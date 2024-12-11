import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Revista } from '../../../tipos/Revista';
import './BarraBusqueda.css';

interface BarrabusquedaProps {
    revistas: Revista[];
}

const Barrabusqueda: React.FC<BarrabusquedaProps> = ({ revistas }) => {
    const [query, setQuery] = useState<string>('');
    const [filteredRevistas, setFilteredRevistas] = useState<Revista[]>([]);
    const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);
    const resultadosRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                resultadosRef.current &&
                !resultadosRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setMostrarResultados(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        filterRevistas(value);
    };

    const filterRevistas = (searchQuery: string) => {
        if (searchQuery.trim() === '') {
            setMostrarResultados(false);
        } else {
            setMostrarResultados(true);
            const results = revistas.filter((revista) =>
                revista.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                revista.autor.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRevistas(results);
        }
    };

    const handleRevistaClick = (revistaId: string) => {
        navigate(`/revista/${revistaId}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            if (query.trim() !== '') {
                filterRevistas(query); 
            }
        }
    };

    return (
        <div className="barraBusqueda">
            <input
                ref={inputRef}
                type="text"
                placeholder="Buscar por título o autor..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} 
                className="entrada_busqueda"
            />
            <div 
                ref={resultadosRef} 
                className={`resultados ${mostrarResultados ? 'visible' : ''}`}
            >
                {filteredRevistas.length > 0 ? (
                    filteredRevistas.map((revista) => (
                        <div
                            key={revista.id}
                            className="resultados_items"
                            onClick={() => handleRevistaClick(revista.id)}
                        >
                            <h3>{revista.titulo}</h3>
                        </div>
                    ))
                ) : (
                    <div className="no-resultados">
                        <p>No se encontraron resultados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Barrabusqueda;
