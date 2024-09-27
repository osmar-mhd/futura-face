import React from 'react';
import '../assets/css/home.css';


const Home = () => {
    const handleStartClick = () => {
        // Lógica para comenzar la acción deseada, como desplazarse a la sección de carga de imágenes
        const uploadSection = document.getElementById('upload');
        if (uploadSection) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home">
            <em><h1>Futura Face</h1></em>
            <p>
                Futura Face es una aplicación de análisis facial diseñada para identificar y verificar individuos. Utilizando técnicas avanzadas de procesamiento de imágenes y análisis de características. La aplicación proporcionará una aproximación mediante la comparación de la imagen del usuario con un extenso conjunto de datos faciales, facilitando la verificación de personas desaparecidas o la identificación de cuerpos finitos e intactos para servicios forenses.
            </p>
            <button onClick={handleStartClick}>Comenzar</button>
        </section>
    );
}

export default Home;
