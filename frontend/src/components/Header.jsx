import React from 'react';
import '../assets/css/header.css';

const Header = ({ imagenCargada, procesamientoCompleto }) => {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="#home" title="Inicio"><i className="material-icons">home</i>Inicio</a></li>
                    <li><a href="#upload" title="Cargar Imagen"><i className="material-icons">upload</i>Cargar Imagen</a></li>
                    {imagenCargada && (
                        <li><a href="#processing" title="Procesamiento"><i className="material-icons">account_box</i>Procesamiento</a></li>
                    )}
                    {procesamientoCompleto && (
                        <li><a href="#results" title="Resultados"><i className="material-icons">person_search</i>Aproximación facial</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;