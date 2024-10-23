import React from "react";

import RevistaItem, { Revista } from "./RevistaItem";

interface RevistaListaProps {
    revistas: Revista[];

}

const TareaLista: React.FC<RevistaListaProps> = ({ revistas }) => {
    return (
        <ul>
            { 
                revistas.map((revista: Revista) => 
                    <RevistaItem 
                        key={`id_${revista.id}`} 
                        revista={revista} 
                         
                    />
                )
            }
        </ul>
    );
};

export default TareaLista;
