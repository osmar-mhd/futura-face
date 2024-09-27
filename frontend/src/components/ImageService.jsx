import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ProcessingResults from './ProcessingResults';
import NeighborsResults from './NeighborsResults';
import Home from './Home'; // Importa el componente Home
import Header from './Header'; // Importa el componente Header
import '../assets/css/imageService.css';

const ImageService = () => {
    const [resultado, setResultado] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseDataList, setResponseDataList] = useState([]);
    const [vecinosImages, setVecinosImages] = useState([]);
    const [vecinosLandmarks, setVecinosLandmarks] = useState([]);
    const [vecinosGifs, setVecinosGifs] = useState([]);
    const [imagenCargada, setImagenCargada] = useState(false); // Nuevo estado
    const [procesamientoCompleto, setProcesamientoCompleto] = useState(false); // Nuevo estado

    const handleImageUpload = async (imagen) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('imagen', imagen);

            const response = await fetch('http://127.0.0.1:5000/preprocesamiento', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setResponseDataList(data);
            setImagenCargada(true); // Actualiza el estado cuando la imagen esté cargada
            window.location.hash = 'processing'; // Desplazarse a la sección de procesamiento
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            setResultado('Error al procesar la imagen. Consulta la consola para más detalles.');
        }
        setLoading(false);
    };

    const handleSendData = async (index, selectedValues) => {
        const dataToSend = {
            ...responseDataList[index],
            ...selectedValues
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/knn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            const result = await response.json();
            setVecinosImages(result.imagenes_base64 || []);
            setVecinosLandmarks(result.imagenes_landmarks || []);
            setVecinosGifs(result.gifs_base64 || []);
            setProcesamientoCompleto(true); // Actualiza el estado cuando el procesamiento esté completo
            window.location.hash = 'results'; // Desplazarse a la sección de resultados
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div>
            <Header imagenCargada={imagenCargada} procesamientoCompleto={procesamientoCompleto} /> {/* Pasa los estados como props */}
            <Home /> {/* Componente Home */}
            {responseDataList.length === 0 && (
                <ImageUpload onImageUpload={handleImageUpload} loading={loading} />
            )}
            {responseDataList.length > 0 && (
                <div id="processing">
                    <ProcessingResults responseDataList={responseDataList} onSendData={handleSendData} resultado={resultado} />
                </div>
            )}
            {vecinosImages.length > 0 && vecinosLandmarks.length > 0 && vecinosGifs.length > 0 && (
                <div id="results">
                    <NeighborsResults vecinosImages={vecinosImages} vecinosLandmarks={vecinosLandmarks} vecinosGifs={vecinosGifs} />
                </div>
            )}
        </div>
    );
};

export default ImageService;