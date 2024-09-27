import React from 'react';

const NeighborsResults = ({ vecinosImages, vecinosLandmarks, vecinosGifs }) => {
    return (
        <section id="results">
            <h1>Módulo de Aproximación Facial</h1>
            <p>
                A continuación se muestran las imágenes de los 5 vecinos más cercanos, los puntos faciales (landmarks) 
                y los GIFs correspondientes.
            </p>
            <p>
                Estas comparaciones visuales permiten una mejor interpretación de los resultados del análisis de similitud facial.
            </p>
            {vecinosImages.length > 0 && (
                <div>
                    <h5>Imágenes de los Vecinos Más Cercanos:</h5>
                    {vecinosImages.map((image, idx) => (
                        <img key={idx} src={`data:image/png;base64,${image}`} alt={`Vecino ${idx}`} />
                    ))}
                </div>
            )}
            {vecinosLandmarks.length > 0 && (
                <div>
                    <h5>Landmarks de los Vecinos Más Cercanos:</h5>
                    {vecinosLandmarks.map((image, idx) => (
                        <img key={idx} src={`data:image/png;base64,${image}`} alt={`Landmark ${idx}`} />
                    ))}
                </div>
            )}
            {vecinosGifs.length > 0 && (
                <div>
                    <h5>GIFs:</h5>
                    {vecinosGifs.map((image, idx) => (
                        <img key={idx} src={`data:image/gif;base64,${image}`} alt={`Gif ${idx}`} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default NeighborsResults;